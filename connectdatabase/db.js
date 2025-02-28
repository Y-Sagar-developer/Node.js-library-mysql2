const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sagar#9550",
  database: "node",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected succesfully");
  }
});

module.exports=connection