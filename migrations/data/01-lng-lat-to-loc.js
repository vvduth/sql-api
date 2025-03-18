const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  password: "admin",
  database: "social",
  host: "localhost",
  port: 5432,
});

pool
  .query(
    `
    update posts
    set loc = POINT(lng, lat)
    where loc is null;
    `
  )
  .then(() => {
    console.log("update complete");
    pool.end();
  })
  .catch((err) => console.log(err.message));
