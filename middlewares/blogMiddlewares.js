const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const upload = require("../helper/multerConfig");

const verifyQueryParams = (req, res, next) => {
  if (req.query != null) {
    let validationArray = ["author", "title", "content", "imageUrl", "links"];
    let extractedValidKeys = {};
    validationArray.forEach((key) => {
      if (req.query[key] == "") {
        extractedValidKeys[key] = 1;
      }
    });
    if (extractedValidKeys == null) {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "invalid query param"),
        req,
        res
      );
    } else {
      req.query = extractedValidKeys;
      next();
    }
  } else {
    next();
  }
};

const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500);
      res.json({ message: "unable to upload image" });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(200);
      res.json({ message: err });
    }
    req.body.imageUrl = req.file.path;
    next();
  });
};

module.exports = {
  verifyQueryParams,
  uploadImage,
};
