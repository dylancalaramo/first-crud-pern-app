// require("dotenv").config({ path: "../.env" || "./env" });
const express = require("express");
const app = express();
const { pool } = require("./db");
const PORT = process.env.SERVER_PORT || 5000;
const cors = require("cors");
console.log(process.env.POSTGRES_HOST);
//middelwares
app.use(express.json());
app.use(cors());

//routes
app.get("/", async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM todo");
    res.status(200).send(rows.rows);
  } catch (err) {
    console.log(err);
    //Change the send message when in prod
    res.status(400).send(`${err.message}`);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO todo (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send("Succesfully added a row");
  } catch (err) {
    console.log(err);
    //Change the send message when in prod
    res.status(400).send(`${err.message}`);
  }
});

app.get("setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE todo( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, address VARCHAR(255) NOT NULL"
    );
    res.status(200).send("Succesfully created the table");
  } catch (err) {
    console.log(err);
    //Change the send message when in prod
    res.status(400).send(`${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
