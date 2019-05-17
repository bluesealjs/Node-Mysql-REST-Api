const mysql = require("mysql");
const dotenv = require("dotenv");

// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "example.com",
//   port: 3306,
//   user: "your username",
//   password: "your password",
//   database: "your database"
// });
dotenv.config();
var pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
};
