const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blogController");

const blogRoute = express.Router();

blogRoute.route("/").get(getAllBlogs).post(createBlog);

module.exports = blogRoute;
