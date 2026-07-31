const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASENAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) return console.error("Error Conecting database", err.stack);

  console.log("Databse Connected");
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
