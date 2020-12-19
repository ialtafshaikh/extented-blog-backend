const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

const { dataUri } = require("../config/multerConfig");
const { uploader } = require("../config/cloudinaryConfig");

const verifyPostRequest = (req, res, next) => {
  console.log(req.headers);
  // console.log(req.file);
  let requiredProps = ["title", "content"];
  let result = requiredProps.every((prop) => {
    return req.body[prop] && req.body[prop].trim().length;
  });
  if (!result) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "Invalid body"),
      req,
      res
    );
  } else {
    next();
  }
};

const verifyQueryParams = (req, res, next) => {
  // when empty req.query is null but it is object

  if (Object.keys(req.query).length != 0) {
    let queryValidationArray = ["author", "title"];
    let validationArray = ["author", "title", "content", "imageUrl", "links"];
    let extractedValidKeys = {};
    let extractedQuery = {};

    queryValidationArray.forEach((key) => {
      if (req.query[key]) {
        extractedQuery[key] = req.query[key];
      }
    });
    // check for null extractedQuery
    if (Object.keys(extractedQuery).length == 0) {
      return sendErrorMessage(
        new AppError(
          400,
          "unsuccessful",
          "no query param and tried to perform select"
        ),
        req,
        res
      );
    }

    if (req.query.select) {
      const selectList = req.query.select.split(",");
      validationArray.forEach((key) => {
        if (selectList.includes(key)) {
          extractedValidKeys[key] = 1;
        }
      });
    }

    if (extractedValidKeys == null) {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "random query param"),
        req,
        res
      );
    } else {
      req.select = extractedValidKeys;
      req.query = extractedQuery;
      next();
    }
  } else {
    req.select = {};
    req.query = {};
    next();
  }
};

const verifyUpdate = (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "no update data"),
      req,
      res
    );
  }

  let updateValidationArray = ["author", "title"];
  let extractedValidKeys = {};

  updateValidationArray.forEach((key) => {
    if (req.body[key]) {
      extractedValidKeys[key] = req.body[key];
    }
  });

  // check for null extractedValidKeys
  if (Object.keys(extractedValidKeys).length == 0) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "valid properties but no data"),
      req,
      res
    );
  }
  req.update = extractedValidKeys;
  next();
};

const uploadImage = (req, res, next) => {
  if (typeof req.file === "undefined") {
    res.status(404);
    return res.json({ message: "you have not uploaded the file" });
  }

  if (process.env.STORAGE_TYPE == "cloud") {
    const file = dataUri(req).content;
    uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        req.image = image;
        next();
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  } else {
    req.image = req.file.filename;
    next();
  }
};

module.exports = {
  verifyPostRequest,
  verifyQueryParams,
  verifyUpdate,
  uploadImage,
};
