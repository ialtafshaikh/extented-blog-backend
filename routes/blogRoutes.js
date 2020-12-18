const express = require("express");

const {
  getAllBlogs,
  createBlog,
  getblogById,
  updateBlog,
  deleteBlog,
  updateRelatedLinks,
} = require("../controllers/blogController");

//middlewares
const {
  verifyPostRequest,
  verifyQueryParams,
  verifyUpdate,
  uploadImage,
} = require("../middlewares/blogMiddlewares");

const { multerUploads } = require("../config/multerConfig");
const { cloudinaryConfig } = require("../config/cloudinaryConfig");

const blogRoute = express.Router();

blogRoute
  .route("/")
  .get(verifyQueryParams, getAllBlogs)
  .post(
    cloudinaryConfig,
    multerUploads,
    verifyPostRequest,
    uploadImage,
    createBlog
  );
blogRoute
  .route("/:blogId")
  .get(getblogById)
  .put(verifyUpdate, updateBlog)
  .delete(deleteBlog);
blogRoute.route("/updateRelatedLinks").put(updateRelatedLinks);

module.exports = blogRoute;
