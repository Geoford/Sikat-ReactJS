const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const fs = require("fs");
const app = express();
const Pusher = require("pusher");

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

const pusher = new Pusher({
  appId: "1875705",
  key: "4810211a14a19b86f640",
  secret: "e3bd24cb43cd9520c5ca",
  cluster: "ap1",
  useTLS: true,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/Register", (req, res) => {
  const {
    firstName,
    lastName,
    cvsuEmail,
    username,
    password,
    studentNumber,
    alias,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !cvsuEmail ||
    !username ||
    !password ||
    !studentNumber
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const userSql =
    "INSERT INTO user_table (`firstName`, `lastName`, `cvsuEmail`, `username`, `password`, `studentNumber`) VALUES (?)";
  const userValues = [
    firstName,
    lastName,
    cvsuEmail,
    username,
    hashedPassword,
    studentNumber,
  ];

  db.query(userSql, [userValues], (err, data) => {
    if (err) {
      console.error("Error inserting user data: ", err);
      return res.status(500).json({ error: "Error inserting user data" });
    }

    const userID = data.insertId;

    const profileSql =
      "INSERT INTO user_profiles (`userID`, `alias`) VALUES (?, ?)";

    db.query(profileSql, [userID, alias], (err, profileData) => {
      if (err) {
        console.error("Error inserting profile data: ", err);
        return res.status(500).json({ error: "Error inserting profile data" });
      }

      return res.status(201).json({ message: "User registered successfully" });
    });
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

    return res.json({
      userID: user.userID,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  });
});

app.put("/EditProfile/:userID", (req, res) => {
  const { userID } = req.params;
  const { firstName, lastName, username, password, bio, alias } = req.body;

  let updateUserSql = `UPDATE user_table SET `;
  const userValues = [];

  if (firstName && firstName.trim()) {
    updateUserSql += `firstName = ?, `;
    userValues.push(firstName);
  }
  if (lastName && lastName.trim()) {
    updateUserSql += `lastName = ?, `;
    userValues.push(lastName);
  }
  if (username && username.trim()) {
    updateUserSql += `username = ?, `;
    userValues.push(username);
  }
  if (password && password.trim()) {
    updateUserSql += `password = ?, `;
    userValues.push(bcrypt.hashSync(password, 10));
  }

  if (userValues.length > 0) {
    updateUserSql = updateUserSql.slice(0, -2);
    updateUserSql += ` WHERE userID = ?`;
    userValues.push(userID);

    db.query(updateUserSql, userValues, (err, userResult) => {
      if (err) {
        console.error("Error updating user: ", err);
        return res.status(500).json({ error: "Failed to update user details" });
      }

      let updateProfileSql = `UPDATE user_profiles SET `;
      const profileValues = [];

      if (bio && bio.trim()) {
        updateProfileSql += `bio = ?, `;
        profileValues.push(bio);
      }
      if (alias && alias.trim()) {
        updateProfileSql += `alias = ?, `;
        profileValues.push(alias);
      }

      if (profileValues.length > 0) {
        updateProfileSql = updateProfileSql.slice(0, -2);
        updateProfileSql += ` WHERE userID = ?`;
        profileValues.push(userID);

        db.query(updateProfileSql, profileValues, (err, profileResult) => {
          if (err) {
            console.error("Error updating profile: ", err);
            return res
              .status(500)
              .json({ error: "Failed to update profile details" });
          }

          return res
            .status(200)
            .json({ message: "Profile updated successfully" });
        });
      } else {
        return res.status(200).json({ message: "User updated successfully" });
      }
    });
  } else {
    return res.status(200).json({ message: "Nothing to update" });
  }
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
    const { title, description, userID, visibility, anonimity, subjects } =
      req.body;
    const file = req.file;
    const parsedSubjects = JSON.parse(subjects); // Parse the subjects

    if (!title || !description || !userID) {
      return res
        .status(400)
        .send({ message: "Title, description, and userID are required." });
    }

    let diary_image = "";
    if (file) {
      diary_image = `/uploads/${file.filename}`;
    }

    const query = `
      INSERT INTO diary_entries (title, description, userID, visibility, anonimity, diary_image, subjects)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      title,
      description,
      userID,
      visibility,
      anonimity,
      diary_image,
      JSON.stringify(parsedSubjects), // Store the subjects as JSON in the database
    ];

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
  const filters = req.query.filters; // Get filter parameters from the request

  // Start building the query
  let query = `
    SELECT 
      diary_entries.*, 
      
      user_table.username,
      user_profiles.profile_image
    FROM diary_entries
    JOIN user_table ON diary_entries.userID = user_table.userID
    JOIN user_profiles ON diary_entries.userID = user_profiles.userID
    WHERE (diary_entries.visibility = 'public' 
    OR (diary_entries.visibility = 'private' AND diary_entries.userID = ?))
  `;

  // Array to hold query parameters
  const queryParams = [userID];

  // Add filtering conditions based on the provided filters
  if (filters && filters.length > 0) {
    const filterConditions = filters.map((filter) => {
      return `diary_entries.subjects = ?`; // Use placeholders to avoid SQL injection
    });

    query += ` AND (${filterConditions.join(" OR ")})`;
    queryParams.push(...filters); // Add filter values to query parameters
  }

  query += ` ORDER BY diary_entries.created_at DESC`;

  db.query(query, queryParams, (err, results) => {
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

app.get("/gadifyStatus/:userID", (req, res) => {
  const { userID } = req.params;

  const query = `SELECT entryID FROM gadify_actions WHERE userID = ?`;
  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error("Error fetching gadify status:", err);
      return res.status(500).json({ error: "Failed to fetch gadify status" });
    }
    res.status(200).json(results);
  });
});

app.get("/fetchUser/user/:id", (req, res) => {
  const userID = req.params.id;

  const userValues =
    "SELECT * FROM user_table JOIN user_profiles ON user_table.userID = user_profiles.userID WHERE user_table.userID = ?";

  db.query(userValues, [userID], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]); // Merged result since the JOIN already includes profile data
  });
});

app.get("/fetchUserEntry/user/:id", (req, res) => {
  const userID = req.params.id;

  const query = `
    SELECT diary_entries.*, user_table.username, user_profiles.*
    FROM diary_entries 
    INNER JOIN user_table ON diary_entries.userID = user_table.userID 
    INNER JOIN user_profiles ON diary_entries.userID = user_profiles.userID 
    WHERE diary_entries.userID = ?
    ORDER BY diary_entries.created_at DESC`;

  db.query(query, [userID], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No entries found for this user" });
    }

    return res.status(200).json({ entries: result });
  });
});

app.get("/fetchDiaryEntry/:entryID", (req, res) => {
  const entryID = req.params.entryID;

  // Assuming you're fetching data from a database
  const query = `SELECT diary_entries.*, user_table.username, user_profiles.*
    FROM diary_entries 
    INNER JOIN user_table ON diary_entries.userID = user_table.userID 
    INNER JOIN user_profiles ON diary_entries.userID = user_profiles.userID 
    WHERE diary_entries.entryID = ?`; // Corrected the WHERE clause

  db.query(query, [entryID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json({ entry: result[0] });
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM user_table WHERE isAdmin = 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.status(200).json(results);
  });
});

app.get("/admin", (req, res) => {
  db.query(
    "SELECT userID, username FROM user_table WHERE isAdmin = 1 LIMIT 1",
    (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching admin.");
      }
      if (results.length === 0) {
        return res.status(404).send("No admin found.");
      }
      res.json(results[0]);
    }
  );
});

app.post("/follow/:followUserId", (req, res) => {
  const { followerId } = req.body;
  const followUserId = req.params.followUserId;

  if (followerId === followUserId) {
    return res.status(400).json({ message: "User cannot follow themselves." });
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction error:", err);
      return res.status(500).send("Transaction error");
    }

    const checkExistingFollowQuery =
      "SELECT * FROM followers WHERE userID = ? AND followedUserID = ?";
    db.query(
      checkExistingFollowQuery,
      [followerId, followUserId],
      (err, results) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error checking follow relationship:", err);
            res.status(500).send("Error checking follow relationship");
          });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .json({ message: "Already following this user" });
        }

        const followQuery =
          "INSERT INTO followers (userID, followedUserID) VALUES (?, ?)";
        db.query(followQuery, [followerId, followUserId], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error inserting follow relationship:", err);
              res.status(500).send("Error following user");
            });
          }

          const updateFollowedCountQuery =
            "UPDATE user_profiles SET followersCount = followersCount + 1 WHERE userID = ?";
          db.query(updateFollowedCountQuery, [followUserId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error updating followers count:", err);
                res.status(500).send("Error updating followers count");
              });
            }

            const updateFollowerCountQuery =
              "UPDATE user_profiles SET followingCount = followingCount + 1 WHERE userID = ?";
            db.query(updateFollowerCountQuery, [followerId], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error updating following count:", err);
                  res.status(500).send("Error updating following count");
                });
              }

              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Transaction commit failed:", err);
                    res.status(500).send("Transaction commit failed");
                  });
                }

                res.status(201).json({ message: "User followed successfully" });
              });
            });
          });
        });
      }
    );
  });
});

app.delete("/unfollow/:followUserId", (req, res) => {
  const { followerId } = req.body;
  const followUserId = req.params.followUserId;

  if (followerId === followUserId) {
    return res
      .status(400)
      .json({ message: "User cannot unfollow themselves." });
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction error:", err);
      return res.status(500).send("Transaction error");
    }

    const checkExistingUnfollowQuery =
      "SELECT * FROM followers WHERE userID = ? AND followedUserID = ?";
    db.query(
      checkExistingUnfollowQuery,
      [followerId, followUserId],
      (err, results) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error checking follow relationship:", err);
            res.status(500).send("Error checking follow relationship");
          });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ message: "User is not following this person" });
        }

        const unfollowQuery =
          "DELETE FROM followers WHERE userID = ? AND followedUserID = ?";
        db.query(unfollowQuery, [followerId, followUserId], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error removing follow relationship:", err);
              res.status(500).send("Error unfollowing user");
            });
          }

          const updateFollowedCountQuery =
            "UPDATE user_profiles SET followersCount = followersCount - 1 WHERE userID = ? AND followersCount > 0";
          db.query(updateFollowedCountQuery, [followUserId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error updating followers count:", err);
                res.status(500).send("Error updating followers count");
              });
            }

            // Update the follower's following count
            const updateFollowerCountQuery =
              "UPDATE user_profiles SET followingCount = followingCount - 1 WHERE userID = ? AND followingCount > 0";
            db.query(updateFollowerCountQuery, [followerId], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error updating following count:", err);
                  res.status(500).send("Error updating following count");
                });
              }

              // Commit the transaction
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Transaction commit failed:", err);
                    res.status(500).send("Transaction commit failed");
                  });
                }

                res
                  .status(200)
                  .json({ message: "User unfollowed successfully" });
              });
            });
          });
        });
      }
    );
  });
});

const getFollowedUsersFromDatabase = async (userID) => {
  const query = `
    SELECT user_table.userID, user_table.username, user_profiles.profile_image
    FROM followers
    INNER JOIN user_table ON followers.followedUserID = user_table.userID
    INNER JOIN user_profiles ON followers.followedUserID = user_profiles.userID
    WHERE followers.userID = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

app.get("/followedUsers/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const followedUsers = await getFollowedUsersFromDatabase(userID);
    res.status(200).json(followedUsers);
  } catch (error) {
    console.error("Error fetching followed users:", error);
    res.status(500).json({ error: "Failed to fetch followed users" });
  }
});

const getFollowersFromDatabase = async (userID) => {
  const query = `
    SELECT u.userID, u.username, up.profile_image
    FROM followers f
    JOIN user_table u ON f.userID = u.userID
    JOIN user_profiles up ON f.userID = up.userID
    WHERE f.followedUserID = ?
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

app.get("/followers/:userID", async (req, res) => {
  const userID = req.params.userID;
  try {
    const followers = await getFollowersFromDatabase(userID);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch followers" });
  }
});

app.get("/fetchComments/:entryID", (req, res) => {
  const { entryID } = req.params;
  const query = `
    SELECT 
      comments.commentID, comments.text, comments.created_at, comments.replyCommentID,
      user_table.username, user_profiles.profile_image
    FROM comments
    INNER JOIN user_table ON comments.userID = user_table.userID
    INNER JOIN user_profiles ON comments.userID = user_profiles.userID
    WHERE comments.entryID = ?
    ORDER BY comments.created_at ASC
  `;

  db.query(query, [entryID], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Failed to fetch comments" });
    }

    // Log the results for debugging purposes
    console.log("Fetched comments:", results);

    res.status(200).json(results);
  });
});

app.post("/comments", (req, res) => {
  const { userID, text, entryID, replyCommentID } = req.body;

  if (!text || !userID || !entryID) {
    return res
      .status(400)
      .json({ error: "User ID, Entry ID, and text are required." });
  }

  const query =
    "INSERT INTO comments (userID, entryID, text, replyCommentID) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [userID, entryID, text, replyCommentID || null],
    (err, results) => {
      if (err) {
        console.error("Error posting comment:", err);
        return res.status(500).json({ error: "Failed to post comment" });
      }
      res.status(201).json({
        message: "Comment posted successfully!",
        commentID: results.insertId,
      });
    }
  );
});

app.delete("/deleteComments/:commentID", (req, res) => {
  const { commentID } = req.params;
  const userID = req.body.userID; // Assuming you pass userID in the request body

  // Step 1: Check if the comment exists and retrieve the entryID and userID
  const commentQuery = `
    SELECT comments.userID AS commentUserID, entries.userID AS entryUserID
    FROM comments
    INNER JOIN entries ON comments.entryID = entries.entryID
    WHERE comments.commentID = ?
  `;

  db.query(commentQuery, [commentID], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    const commentUserID = results[0].commentUserID;
    const entryUserID = results[0].entryUserID;

    // Step 2: Check if the requesting user is the owner of the comment and the diary entry
    if (commentUserID !== userID && entryUserID !== userID) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment." });
    }

    // Step 3: Proceed with deletion if checks pass
    db.query("DELETE FROM comments WHERE commentID = ?", [commentID], (err) => {
      if (err) {
        console.error("Error deleting comment:", err);
        return res.status(500).json({ error: "Failed to delete comment." });
      }
      res.status(204).send(); // Successfully deleted
    });
  });
});

app.post("/uploadProfile", upload.single("file"), (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    console.log("No user ID provided");
    return res.status(400).json({ message: "No user ID provided." });
  }

  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file uploaded." });
  }

  const newFilePath = `/uploads/${req.file.filename}`;

  const getCurrentProfileQuery =
    "SELECT profile_image FROM user_profiles WHERE userID = ?";

  db.query(getCurrentProfileQuery, [userID], (err, result) => {
    if (err) {
      console.error("Error fetching current profile image:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const currentProfileImage = result[0]?.profile_image;

    if (currentProfileImage) {
      const currentImagePath = path.join(__dirname, currentProfileImage);

      fs.unlink(currentImagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting current profile image:", err);
          return res
            .status(500)
            .json({ message: "Error deleting current profile image" });
        }

        const updateQuery =
          "UPDATE user_profiles SET profile_image = ? WHERE userID = ?";

        db.query(updateQuery, [newFilePath, userID], (err) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
          }

          console.log("Profile photo uploaded successfully", newFilePath);
          res.json({
            message: "Profile photo uploaded successfully",
            filePath: newFilePath,
          });
        });
      });
    } else {
      const updateQuery =
        "UPDATE user_profiles SET profile_image = ? WHERE userID = ?";

      db.query(updateQuery, [newFilePath, userID], (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        console.log("Profile photo uploaded successfully", newFilePath);
        res.json({
          message: "Profile photo uploaded successfully",
          filePath: newFilePath,
        });
      });
    }
  });
});

app.post("/message", (req, res) => {
  const { senderID, recipientID, message } = req.body;
  if (!senderID || !recipientID || !message) {
    return res
      .status(400)
      .send("SenderID, recipientID, and message are required.");
  }

  db.query(
    "INSERT INTO messages (senderID, recipientID, message) VALUES (?, ?, ?)",
    [senderID, recipientID, message],
    (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error sending message.");
      }

      // Notify all users via Pusher (on the global 'chat-channel')
      pusher.trigger("chat-channel", "message-event", {
        message,
        senderID,
        recipientID, // Send recipientID to filter messages on the client side
      });

      pusher.trigger("admin-channel", "message-event", {
        message,
        senderID,
        recipientID,
      });

      res.status(200).send("Message sent successfully");
    }
  );
});

app.get("/messages", (req, res) => {
  const { userID, withUserID } = req.query;

  if (!userID || !withUserID) {
    return res.status(400).send("userID and withUserID are required.");
  }

  // Fetch messages where (senderID = userID AND recipientID = withUserID)
  // OR (senderID = withUserID AND recipientID = userID)
  const query = `
    SELECT * FROM messages 
    WHERE (senderID = ? AND recipientID = ?) 
       OR (senderID = ? AND recipientID = ?)
    ORDER BY created_at ASC
  `;

  db.query(query, [userID, withUserID, withUserID, userID], (err, messages) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).send("Error fetching messages.");
    }
    res.json(messages);
  });
});

app.post("/notifications/:userID", async (req, res) => {
  const { userID, actorID, message, entryID, type } = req.body;

  // 1. Insert notification into the database
  const insertNotificationQuery = `
    INSERT INTO notifications (userID, actorID, message, entryID, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    insertNotificationQuery,
    [userID, actorID, message, entryID, type],
    (error, results) => {
      if (error) {
        console.error("Error inserting notification into database:", error);
        return res.status(500).send("Error saving notification");
      }

      // 2. Trigger Pusher to notify the user
      pusher.trigger(`notifications-${userID}`, "new-notification", {
        actorID,
        message,
        entryID,
        type,
        timestamp: new Date().toISOString(),
      });

      res.status(200).send("Notification sent");
    }
  );
});

app.get("/notifications/:userID", async (req, res) => {
  const { userID } = req.params;

  // Query to fetch notifications for the specified userID
  const fetchNotificationsQuery = `
    SELECT 
      n.*, 
      u.username AS actorUsername, 
      up.profile_image AS actorProfileImage 
    FROM 
      notifications n
    JOIN 
      user_table u ON n.actorID = u.userID
    LEFT JOIN 
      user_profile up ON u.userID = up.userID
    WHERE 
      n.userID = ?
    ORDER BY 
      n.timestamp DESC
  `;

  db.query(fetchNotificationsQuery, [userID], (error, results) => {
    if (error) {
      console.error("Error fetching notifications from database:", error);
      return res.status(500).send("Error fetching notifications");
    }

    res.status(200).json(results); // Send the notifications as JSON response
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
