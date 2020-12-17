const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

const verifyPostRequest = (req, res, next) => {
  console.log(req.body);
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

module.exports = {
  verifyPostRequest,
  verifyQueryParams,
};
