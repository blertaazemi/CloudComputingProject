const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { getConnection, readData } = require("./connection");
const booksRouter = require("./routes/books");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/books", booksRouter);

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "crud.html"));
});

getConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
