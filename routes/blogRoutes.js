const express = require("express");

const {
  getAllBlogs,
  createBlog,
  getblogById,
  updateBlog,
  deleteBlog,
  populateRelatedLinks,
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
blogRoute.route("/populateLinks").post(populateRelatedLinks);

module.exports = blogRoute;
