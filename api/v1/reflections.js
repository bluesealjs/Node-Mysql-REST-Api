const express = require("express");
const router = express.Router();
const moment = require("moment");
const uuidv4 = require("uuid/v4");
const db = require("../../db/index");

/**
 * Create A Reflection
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
router.post("", async (req, res) => {
  const text = `INSERT INTO
      reflections(id, success, low_point, take_away, created_date, modified_date)
      VALUES(?, ?, ?, ?, ?, ?);`;
  const values = [
    uuidv4(),
    req.body.success,
    req.body.low_point,
    req.body.take_away,
    moment(new Date()).format("YY-MM-DD HH:MM:SS"),
    moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
  ];

  try {
    const datas = await db.query(text, values);
    return res.status(201).json(datas);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
/**
 * Get All Reflection
 * @param {object} req
 * @param {object} res
 * @returns {object} reflections array
 */
router.get("", async (req, res) => {
  const findAllQuery = "SELECT * FROM reflections";
  try {
    const datas = await db.query(findAllQuery);
    return res.status(200).json(datas);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
/**
 * Get A Reflection
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
router.get("/:id", async (req, res) => {
  const text = "SELECT * FROM reflections WHERE id = ?";
  try {
    const datas = await db.query(text, [req.params.id]);
    if (!datas) {
      return res.status(404).json({ message: "reflection not found" });
    }
    return res.status(200).json(datas);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
/**
 * Update A Reflection
 * @param {object} req
 * @param {object} res
 * @returns {object} updated reflection
 */
router.put("/:id", async (req, res) => {
  const findOneQuery = "SELECT * FROM reflections WHERE id=?";
  const updateOneQuery = `UPDATE reflections
      SET success=?,low_point=?,take_away=?,modified_date=?
      WHERE id=?;`;
  try {
    const datas = await db.query(findOneQuery, [req.params.id]);
    if (!datas) {
      return res.status(404).json({ message: "reflection not found" });
    }
    const values = [
      req.body.success || datas.RowDataPacket.success,
      req.body.low_point || datas.RowDataPacket.low_point,
      req.body.take_away || datas.RowDataPacket.take_away,
      moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
      req.params.id
    ];
    const response = await db.query(updateOneQuery, values);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
/**
 * Delete A Reflection
 * @param {object} req
 * @param {object} res
 * @returns {void} return statuc code 204
 */
router.delete("/:id", async (req, res) => {
  const deleteQuery = "DELETE FROM reflections WHERE id=?;";
  try {
    const datas = await db.query(deleteQuery, [req.params.id]);
    if (!datas) {
      return res.status(404).json({ message: "reflection not found" });
    }
    return res.status(204).json({ message: "deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

/*
HTTP Status Code 204: 
The server has successfully fulfilled the request and that there is no additional 
content to send in the response payload body.
*/
