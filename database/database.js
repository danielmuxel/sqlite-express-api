// import dependencies
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const databaseFile = "./data/test.db";

// delete the database file
try {
  fs.unlinkSync(databaseFile);
} catch (error) {
  console.error(error.message);
}

// create new database file
const db = new sqlite3.Database(databaseFile, (error) => {
  if (error) {
    return console.error(error.message);
  }
});

// read sql file to create new database from it
const dataSql = fs.readFileSync("./database/database.sql").toString();

const dataArr = dataSql.toString().split(");");

// db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
db.serialize(() => {
  // db.run runs your SQL query against the DB
  db.run("PRAGMA foreign_keys=OFF;");
  db.run("BEGIN TRANSACTION;");
  // Loop through the `dataArr` and db.run each query
  dataArr.forEach((query) => {
    if (query) {
      // Add the delimiter back to each query before you run them
      // In my case the it was `);`
      query += ");";
      db.run(query, (err) => {
        if (err) throw err;
      });
    }
  });
  db.run("COMMIT;");
});

// Close the DB connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});
