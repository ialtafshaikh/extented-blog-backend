const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getblogById,
  updateRelatedLinks,
} = require("../controllers/blogController");

const blogRoute = express.Router();

blogRoute.route("/").get(getAllBlogs).post(createBlog);
blogRoute.route("/:blogId").get(getblogById);
blogRoute.route("/updateRelatedLinks").put(updateRelatedLinks);

module.exports = blogRoute;
