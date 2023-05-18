import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import ClientError from './client-error.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/stores', async (req, res, next) => {
  try {
    const sql = `
    select * from "stores" left join (select "storeId" as "temp", COUNT(*), TRUNC(AVG("rating"),1) as "average_rating"
      from "reviews" group by "temp") reviews on "stores"."storeId" = "reviews"."temp"
    `;
    const storeRatingsData = await db.query(sql);
    res.status(200).json({
      status: 'success',
      data: {
        storeRatings: storeRatingsData.rows
      }
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/stores/:storeId', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    if (!Number.isInteger(storeId) || storeId < 1) {
      throw new ClientError(400, 'storeId must be a positive integer');
    }
    const sql = `
    select * from "stores"
      where "storeId" = $1
    `;
    const params = [storeId];
    const store = await db.query(sql, params);
    if (!store.rows[0]) {
      throw new ClientError(400, `the store id of: ${storeId} does not exist`);
    }
    const sql2 = `
    select * from reviews
      where "storeId" = $1
    `;
    const params2 = [storeId];
    const reviews = await db.query(sql2, params2);
    res.status(200).json({
      data: {
        store: store.rows[0],
        reviews: reviews.rows
      }
    });
  } catch (err) {
    next(err);
  }
});

app.post('/api/stores', async (req, res, next) => {
  try {
    const { name, location, priceRange } = req.body;
    if (!name || !location || !priceRange) {
      throw new ClientError(400, 'name, location, and priceRange are required');
    }
    const sql = `
    insert into "stores" ("name", "location", "priceRange")
      values ($1, $2, $3)
      returning *
    `;
    const params = [name, location, priceRange];
    const result = await db.query(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/stores/:storeId', async (req, res, next) => {
  try {
    const { name, location, priceRange } = req.body;
    const storeId = Number(req.params.storeId);
    if (!Number.isInteger(storeId) || storeId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    const sql = `
    update "stores"
      set "name" = $1,
          "location" = $2,
          "priceRange" = $3
      where "storeId" = $4
      returning *
    `;
    const params = [name, location, priceRange, storeId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(400, 'this id does not exist');
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/stores/:storeId', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    if (!Number.isInteger(storeId) || storeId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    if (!storeId) {
      throw new ClientError(400, 'invalid id');
    }
    const sql = `
    delete from "stores"
      where "storeId" = $1
      returning *
    `;
    const params = [storeId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(400, 'deleted store not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/stores/:storeId/addReview', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    if (!Number.isInteger(storeId) || storeId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    if (!storeId) {
      throw new ClientError(400, 'invalid id');
    }
    const { name, review, rating } = req.body;
    if (!name || !review || !rating) {
      throw new ClientError(400, 'name, review, and rating are required');
    }
    const sql = `
    insert into "reviews" ("storeId", "name", "review", "rating")
      values ($1, $2, $3, $4)
      returning *
    `;
    const params = [storeId, name, review, rating];
    const newReview = await db.query(sql, params);
    if (!newReview.rows[0]) {
      throw new ClientError(400, 'error when submitting review');
    }
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0]
      }
    });
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
