import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import ClientError from './client-error.js';
import cors from 'cors';

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

app.get('/api/restaurants', async (req, res, next) => {
  try {
    const sql = `
    select *
      from "restaurants"
    `;
    const result = await db.query(sql);
    const sql2 = `
    select * from "restaurants" left join (select "restaurantId" as "temp", COUNT(*), TRUNC(AVG("rating"),1) as "average_rating"
      from "reviews" group by "temp") reviews on "restaurants"."restaurantId" = "reviews"."temp"
    `;
    const restaurantRatingsData = await db.query(sql2);
    res.status(200).json({
      status: "success",
      data: {
        restaurantRatings: restaurantRatingsData.rows
      }
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/restaurants/:restaurantId', async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (!Number.isInteger(restaurantId) || restaurantId < 1) {
      throw new ClientError(400, 'restaurantId must be a positive integer');
    }
    const sql = `
    select * from "restaurants"
      where "restaurantId" = $1
    `;
    const params = [restaurantId];
    const restaurant = await db.query(sql, params);
    if(!restaurant.rows[0]) {
      throw new ClientError(400, `the restaurant id of: ${restaurantId} does not exist`);
    }
    const sql2 = `
    select * from reviews
      where "restaurantId" = $1
    `;
    const params2 = [restaurantId];
    const reviews = await db.query(sql2, params2);
    res.status(200).json({
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    });
  } catch(err) {
    next(err);
  }
});

app.post('/api/restaurants', async (req, res, next) => {
  try {
    const { name, location, priceRange } = req.body;
    if (!name || !location || !priceRange) {
      throw new ClientError(400, 'name, location, and priceRange are required');
    }
    const sql = `
    insert into "restaurants" ("name", "location", "priceRange")
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

app.put('/api/restaurants/:restaurantId', async (req, res, next) => {
  try {
    const {name, location, priceRange} = req.body;
    const restaurantId = Number(req.params.restaurantId);
    if(!Number.isInteger(restaurantId) || restaurantId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    const sql = `
    update "restaurants"
      set "name" = $1,
          "location" = $2,
          "priceRange" = $3
      where "restaurantId" = $4
      returning *
    `;
    const params = [name, location, priceRange, restaurantId];
    const result = await db.query(sql, params);
    if(!result.rows[0]) {
      throw new ClientError(400, 'this id does not exist');
    }
    res.json(result.rows[0]);
  } catch(err) {
    next(err);
  }
});

app.delete('/api/restaurants/:restaurantId', async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if(!Number.isInteger(restaurantId) || restaurantId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    if (!restaurantId) {
      throw new ClientError(400, 'invalid id');
    }
    const sql = `
    delete from "restaurants"
      where "restaurantId" = $1
      returning *
    `;
    const params = [restaurantId]
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(400, 'deleted grade not found');
    }
    res.json(result.rows[0]);
  } catch(err) {
    next(err);
  }
});

app.post("/api/restaurants/:restaurantId/addReview", async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if(!Number.isInteger(restaurantId) || restaurantId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    if(!restaurantId) {
      throw new ClientError(400, 'invalid id');
    }
    const {name, review, rating} = req.body;
    if (!name || !review || !rating) {
      throw new ClientError(400, 'name, review, and rating are required');
    }
    const sql = `
    insert into "reviews" ("restaurantId", "name", "review", "rating")
      values ($1, $2, $3, $4)
      returning *
    `;
    const params = [restaurantId, name, review, rating];
    const newReview = await db.query(sql, params);
    if(!newReview.rows[0]) {
      throw new ClientError(400, 'error when submitting review');
    }
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0]
      }
    })
  } catch(err) {
    next(err);
  }
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
