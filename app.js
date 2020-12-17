const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dontenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const blogRouter = require("./routes/blogRoutes");

// env config
dontenv.config({ path: ".env" });
const PORT = process.env.PORT;
const dbURI = process.env.DATABASE_URL;

const connect = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = path.join(__dirname, "uploads");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

const upload = multer({ storage: storage }).single("avatar");

connect.then(
  (db) => {
    console.log("Connected Successfully to Mongodb Server");
  },
  (err) => {
    console.log(err);
  }
);

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
