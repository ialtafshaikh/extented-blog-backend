const axios = require("axios");

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://node-authentication-backend.herokuapp.com";
const endpointSignUp = "/users/signup";
const endpointLogin = "/users/login";
const endpointAuth = "/auth";

const signUpUser = async (req, res, next) => {
  let response;
  try {
    response = await axios.post(BASE_URL + endpointSignUp, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    return sendErrorMessage(
      new AppError(400, error.response.data, ""),
      req,
      res
    );
  }
};

const loginUser = async (req, res, next) => {
  let response;
  try {
    response = await axios.post(BASE_URL + endpointLogin, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    return sendErrorMessage(
      new AppError(400, error.response.data, ""),
      req,
      res
    );
  }
};

const authorize = async (req, res, next) => {
  let response;
  try {
    response = await axios.post(BASE_URL + endpointAuth, {
      authorization: req.headers.authorization,
    });
    res.currentUser = response.data;
    next();
  } catch (error) {
    return sendErrorMessage(
      new AppError(400, error.response.data, ""),
      req,
      res
    );
  }
};

module.exports = {
  signUpUser,
  loginUser,
  authorize,
};
