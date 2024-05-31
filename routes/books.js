const express = require("express");
const router = express.Router();
const { getConnection } = require("../connection");
const sql = require("mssql");

// Read all books
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Library_Books");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).send("Error querying database: " + err);
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const { title, author, publisher, year, genre, copies } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("author", sql.NVarChar, author)
      .input("publisher", sql.NVarChar, publisher)
      .input("year", sql.Int, year)
      .input("genre", sql.NVarChar, genre)
      .input("copies", sql.Int, copies)
      .query(
        "INSERT INTO Library_Books (Title, Author, Publisher, YearPublished, Genre, CopiesAvailable) VALUES (@title, @author, @publisher, @year, @genre, @copies)"
      );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book: " + err);
  }
});

// Edit a book
router.post("/edit", async (req, res) => {
  const { originalTitle, title, author, publisher, year, genre, copies } =
    req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("originalTitle", sql.NVarChar, originalTitle)
      .input("title", sql.NVarChar, title)
      .input("author", sql.NVarChar, author)
      .input("publisher", sql.NVarChar, publisher)
      .input("year", sql.Int, year)
      .input("genre", sql.NVarChar, genre)
      .input("copies", sql.Int, copies).query(`
          UPDATE Library_Books
          SET Title=@title, Author=@author, Publisher=@publisher, YearPublished=@year, Genre=@genre, CopiesAvailable=@copies
          WHERE Title=@originalTitle
        `);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book: " + err);
  }
});

// Delete a book
router.post("/delete", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send("Book title is required.");
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .query("DELETE FROM Library_Books WHERE Title=@title");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book: " + err);
  }
});

module.exports = router;
