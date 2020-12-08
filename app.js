const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dontenv = require("dotenv");

dontenv.config({ path: ".env" });
const PORT = process.env.PORT;
const dbURI = process.env.DATABASE_URL;

const connect = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Connected Successfully to Mongodb Server");
  },
  (err) => {
    console.log(err);
  }
);

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
