const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

const verifyPostRequest = (req, res, next) => {
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

module.exports = {
  verifyPostRequest,
  verifyQueryParams,
  verifyUpdate,
};
