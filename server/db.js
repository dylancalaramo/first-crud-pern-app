const { Pool } = require("pg");
require("dotenv").config({ path: "../.env" });
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
});

module.exports = { pool };
