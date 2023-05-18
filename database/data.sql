-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);
insert into "stores"
          ("name", "location", "priceRange")
          values
            ('Macys', 'Irvine', 3)
          returning *;

insert into "reviews"
          ("storeId", "name", "review", "rating")
          VALUES
            (1, 'Deborah', 'terrible store', 1),
            (1, 'Joann', 'Not too shabby', 3),
            (1, 'Lmberto', 'Thankful to come to such a nice store', 4)
            returning *;
