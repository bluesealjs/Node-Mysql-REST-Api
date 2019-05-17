const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
var pool = mysql.createPool(process.env.DATABASE_URL);

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      reflections(
        id VARCHAR(100) PRIMARY KEY,
        success VARCHAR(128) NOT NULL,
        low_point VARCHAR(128) NOT NULL,
        take_away VARCHAR(128) NOT NULL,
        created_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        modified_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`;

  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    console.log(results[0]);
  });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = "DROP TABLE IF EXISTS reflections";
  pool.query(queryText, (error, results, fields) => {
    if (error) throw error;
    console.log(results[0]);
  });
};

pool.on("release", () => {
  console.log("pool released!");
});

pool.on("enqueue", function() {
  console.log("Waiting for available connection slot");
});

module.exports = {
  createTables,
  dropTables
};

require("make-runnable");

/*
we require make-runnable package -
We need this to be able to call and any of our two functions from the terminal.
Note: You have to require make-runnable at the end.
Also, don't forget to install make-runnable as project dev-dependency.
*/
