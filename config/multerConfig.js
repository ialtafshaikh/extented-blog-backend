const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");
const fs = require("fs");
const dontenv = require("dotenv");
dontenv.config({ path: ".env" });

let storage;
let dataUri;
const parser = new DatauriParser();

if (process.env.STORAGE_TYPE == "cloud") {
  storage = multer.memoryStorage();
  dataUri = (req) =>
    parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );
} else {
  dataUri = {};
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var directory = process.env.STORAGE;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          "." +
          file.originalname.split(".")[1]
      );
    },
  });
}

const multerUploads = multer({ storage: storage }).single("banner");

module.exports = { multerUploads, dataUri };
