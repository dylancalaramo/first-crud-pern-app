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
  const { task, deadline } = req.body;
  try {
    await pool.query("INSERT INTO todo (task, deadline) VALUES ($1, $2)", [
      task,
      deadline,
    ]);
    res.status(200).send("Succesfully added a row");
  } catch (err) {
    console.log(err);
    //Change the send message when in prod
    res.status(400).send(`${err.message}`);
  }
});

app.delete("/", async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) {
    res.status(400).send({ message: "No ids are selected" });
  }

  try {
    await pool.query("DELETE FROM todo WHERE id = ANY($1)", [ids]);
    res.status(200).send(`Successfully deleted ${ids.length} rows`);
  } catch (err) {
    console.error("Database Error", error.message);
    res.status(500).send({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
