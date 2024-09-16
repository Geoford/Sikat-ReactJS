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

app.get("/usertable", (req, res) => {
  const sql = "SELECT * FROM user_table";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving data" });
    }
    return res.json(data);
  });
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

app.post("/Add", (req, res) => {
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

app.put("/UpdateStudent", (req, res) => {
  const { firstName, lastName, cvsuEmail, username, password } = req.body;
  const sql = `UPDATE user_table SET firstName = ?, lastName = ?, cvsuEmail = ?, password = ? WHERE username = ?`;

  db.query(
    sql,
    [firstName, lastName, cvsuEmail, password, username],
    (err, data) => {
      if (err) {
        console.error("Error updating data: ", err);
        return res.status(500).json({ error: "Error updating data" });
      }
      res.json({ message: "Student updated successfully" });
    }
  );
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

app.listen(8082, () => {
  console.log("Server listening on port 8082");
});
