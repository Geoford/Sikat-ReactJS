const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sikat-ediary",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, res) => {
  res.json("Hello!");
});

app.post("/Register", (req, res) => {
  const sql =
    "INSERT INTO user_table (`firstName`, `lastName`, `cvsuEmail`, `username`, `password`) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.cvsuEmail,
    req.body.username,
    req.body.password,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.json(data);
  });
});

app.post("/Login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user_table WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      return res.status(500).json({ error: "Error retrieving data" });
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    return res.json(data[0]);
  });
});

app.post("/entry", (req, res) => {
  const { title, description, user_id } = req.body;

  const query =
    "INSERT INTO diary_entries (title, description, user_id) VALUES (?, ?, ?)";
  db.query(query, [title, description, user_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: "Entry added successfully!" });
  });
});

app.get("/entries", (req, res) => {
  const query = `
    SELECT diary_entries.id, diary_entries.title, diary_entries.description, user_table.username
    FROM diary_entries
    JOIN user_table ON diary_entries.user_id = user_table.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
