const express = require("express");
const app = express();
const productRouter = require("./routes/products");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

const MONGODB_URL = `${process.env.MONGODB_URL}`;

app.use(bodyParser.json());
app.use(helmet());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((error, req, res, next) => {
  const stauts = error.statusCode || 500;
  const message = error.message;
  res.status(stauts).json({ isError: true, message: message });
});

app.use(productRouter);

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
