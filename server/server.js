// require("dotenv").config({ path: "../.env" || "./env" });
const express = require("express");
const app = express();
const { pool } = require("./db");
const PORT = process.env.SERVER_PORT || 5000;
const cors = require("cors");
// console.log(process.env.DEV_POSTGRES_HOST);
// pool.connect();
//middelwares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.get("/", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM todo");

    const result = query.rows.map((row) => ({
      id: row.id,
      data: {
        task: row.task,
        created_at: row.created_at,
        deadline: row.deadline,
      },
    }));
    // console.log(query);

    res.status(200).send(result);
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

app.put("/", async (req, res) => {
  const data = req.body;
  if (!req.body || data.length === 0 || !data) {
    res.status(400).send({ message: "there is nothing to edit" });
    return;
  }

  const handleValues = (data) => {
    const values = [];

    data.forEach((row) => {
      values.push(row.id, row.edit_string, row.deadline);
    });

    const placeholder = data
      .map((row = "", index) => {
        const placeholderIndex = index * 3 + 1;
        return `($${placeholderIndex}::int, $${placeholderIndex + 1}::text, $${
          placeholderIndex + 2
        }::timestamptz)`;
      })
      .join(", ");

    return {
      values: values,
      placeholder: placeholder,
    };
  };

  const { values, placeholder } = handleValues(data);

  try {
    const queryString = `
    UPDATE todo AS t
    SET
      task = u.task,
      deadline = u.deadline
    FROM
      (VALUES ${placeholder})
    AS u(id, task, deadline)
    WHERE t.id = u.id`;

    await pool.query(queryString, values);
    res
      .status(200)
      .send({ message: `Succesfully updated: ${data.length} rows` });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: "server error" });
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
