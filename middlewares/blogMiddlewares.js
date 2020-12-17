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
  if (req.query != null) {
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
    next();
  }
};

module.exports = {
  verifyPostRequest,
  verifyQueryParams,
};
