const Blog = require("../models/blogs");

const getAllBlogs = (req, res, next) => {
  res.status(200).json({ status: "get all blogs" });
};

const createBlog = (req, res, next) => {
  res.status(200).json({ status: "create blog" });
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.createBlog = createBlog;
