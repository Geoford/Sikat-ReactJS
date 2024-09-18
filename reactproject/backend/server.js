const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

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

app.post("/Register", (req, res) => {
  const { firstName, lastName, cvsuEmail, username, password } = req.body;
  if (!firstName || !lastName || !cvsuEmail || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const sql =
    "INSERT INTO user_table (`firstName`, `lastName`, `cvsuEmail`, `username`, `password`) VALUES (?)";
  const values = [firstName, lastName, cvsuEmail, username, hashedPassword];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

app.post("/Login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM user_table WHERE username = ?";
  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      return res.status(500).json({ error: "Error retrieving data" });
    }
    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.json({ userID: user.userID, username: user.username });
  });
});

app.put("/update/:userID", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const sql = `UPDATE user_table SET firstName = ?, lastName = ?, cvsuEmail = ?, username = ?, password = ? WHERE userID = ?`;
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.cvsuEmail,
    req.body.username,
    hashedPassword,
  ];
  const id = req.params.userID;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Error updating user" });
    }
    console.log("Update result:", data);
    return res.json(data);
  });
});

app.post(
  "/entry",
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send({ message: "File size is too large. Maximum 5MB allowed." });
        }
        if (err.code === "INVALID_FILE_TYPE") {
          return res
            .status(400)
            .send({ message: "Only image files are allowed." });
        }
        return res.status(500).send({ message: "File upload error." });
      }
      next();
    });
  },
  (req, res) => {
    const { title, description, userID, visibility, anonimity } = req.body;
    const file = req.file;

    if (!title || !description || !userID) {
      return res
        .status(400)
        .send({ message: "Title, description, and userID are required." });
    }

    let fileURL = "";
    if (file) {
      fileURL = `/uploads/${file.filename}`;
    }

    const query = `
      INSERT INTO diary_entries (title, description, userID, visibility, anonimity, fileURL)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [title, description, userID, visibility, anonimity, fileURL];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting diary entry:", err);
        return res
          .status(500)
          .send({ message: "Failed to save diary entry. Please try again." });
      }
      res.status(200).send({ message: "Entry added successfully!" });
    });
  }
);

app.get("/entries", (req, res) => {
  const userID = req.query.userID;

  const query = `
    SELECT diary_entries.entryID, diary_entries.title, diary_entries.visibility, diary_entries.anonimity, diary_entries.description, diary_entries.fileURL, diary_entries.gadifyCount, user_table.username
    FROM diary_entries
    JOIN user_table ON diary_entries.userID = user_table.userID
    WHERE (diary_entries.visibility = 'public' 
    OR (diary_entries.visibility = 'private' AND diary_entries.userID = ?))
    ORDER BY diary_entries.created_at DESC
  `;

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error("Error fetching diary entries:", err.message);
      return res.status(500).json({ error: "Error fetching diary entries" });
    }
    res.status(200).json(results);
  });
});

app.post("/entry/:entryID/gadify", (req, res) => {
  const { entryID } = req.params;
  const userID = req.body.userID;

  const checkQuery = `SELECT * FROM gadify_actions WHERE userID = ? AND entryID = ?`;
  db.query(checkQuery, [userID, entryID], (err, results) => {
    if (err) {
      console.error("Error checking gadify status:", err);
      return res.status(500).json({ error: "Failed to check gadify status" });
    }

    if (results.length > 0) {
      // User has already gadified this entry; remove action and decrement count
      const deleteQuery = `DELETE FROM gadify_actions WHERE userID = ? AND entryID = ?`;
      db.query(deleteQuery, [userID, entryID], (err) => {
        if (err) {
          console.error("Error removing gadify action:", err);
          return res
            .status(500)
            .json({ error: "Failed to remove gadify action" });
        }

        const updateQuery = `UPDATE diary_entries SET gadifyCount = gadifyCount - 1 WHERE entryID = ?`;
        db.query(updateQuery, [entryID], (err) => {
          if (err) {
            console.error("Error updating gadify count:", err);
            return res
              .status(500)
              .json({ error: "Failed to update gadify count" });
          }
          res
            .status(200)
            .json({ message: "Gadify action removed successfully" });
        });
      });
    } else {
      // User has not gadified this entry; add action and increment count
      const insertQuery = `INSERT INTO gadify_actions (userID, entryID) VALUES (?, ?)`;
      db.query(insertQuery, [userID, entryID], (err) => {
        if (err) {
          console.error("Error inserting gadify action:", err);
          return res.status(500).json({ error: "Failed to gadify entry" });
        }

        const updateQuery = `UPDATE diary_entries SET gadifyCount = gadifyCount + 1 WHERE entryID = ?`;
        db.query(updateQuery, [entryID], (err) => {
          if (err) {
            console.error("Error updating gadify count:", err);
            return res
              .status(500)
              .json({ error: "Failed to update gadify count" });
          }
          res
            .status(200)
            .json({ message: "Gadify action recorded successfully" });
        });
      });
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.code = "INVALID_FILE_TYPE";
      return cb(error);
    }
    cb(null, true);
  },
});

app.get("/users", (req, res) => {
  const query = "SELECT userID, username FROM user_table";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
