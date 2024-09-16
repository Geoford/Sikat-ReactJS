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
  database: "sikatdb",
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
