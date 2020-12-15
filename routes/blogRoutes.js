const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getblogById,
} = require("../controllers/blogController");

const blogRoute = express.Router();

blogRoute.route("/").get(getAllBlogs).post(createBlog);
blogRoute.route("/:blogId").get(getblogById);

module.exports = blogRoute;
