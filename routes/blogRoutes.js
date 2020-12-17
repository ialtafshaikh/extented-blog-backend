const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getblogById,
  deleteBlog,
  updateRelatedLinks,
} = require("../controllers/blogController");

//middlewares
const {
  verifyPostRequest,
  verifyQueryParams,
} = require("../middlewares/blogMiddlewares");

const upload = require("../helper/multerConfig");

const blogRoute = express.Router();

blogRoute
  .route("/")
  .get(verifyQueryParams, getAllBlogs)
  .post(upload, verifyPostRequest, createBlog);
blogRoute.route("/:blogId").get(getblogById).delete(deleteBlog);
blogRoute.route("/updateRelatedLinks").put(updateRelatedLinks);

module.exports = blogRoute;
