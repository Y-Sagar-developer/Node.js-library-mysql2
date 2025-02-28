const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sagar#9550",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  connection.query("CREATE DATABASE IF NOT EXISTS movieDB", (err, result) => {
    if (err) throw err;
    console.log("Database created or already exists");
    connection.query("USE movieDB", (err, result) => {
      if (err) throw err;
      console.log("Using movieDB database");

      const createTableQuery = `CREATE TABLE IF NOT EXISTS movies (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                actor VARCHAR(255) NOT NULL
            )`;

      connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Movies table is ready");
      });
    });
  });
});

// Route to check movie and actor
app.post("/check", (req, res) => {
  let user_name = req.body.movie;
  let user_hero = req.body.hero;
  let sql = `SELECT * FROM movies WHERE name='${user_name}' AND actor='${user_hero}'`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      res.send(result);
    } else {
      res.send("Invalid credentials");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
