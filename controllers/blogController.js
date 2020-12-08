const Task = require("../models/Task");

const getAllBlogs = (req, res, next) => {
  console.log("get all blogs");
};

const createBlog = (req, res, next) => {
  console.log("create blog");
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.createBlog = createBlog;
