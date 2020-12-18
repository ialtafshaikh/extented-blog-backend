const Blogs = require("../models/blogs");

// res => will contain currentUser object currently logged in
const getAllBlogs = (req, res, next) => {
  if (
    Object.keys(req.select).length != 0 ||
    Object.keys(req.query).length != 0
  ) {
    req.select._id = 0;
    req.select.blogID = 1;
    req.query.author = res.currentUser._id;
    Blogs.find(req.query)
      .select(req.select)
      .then((blogs) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ blogs: blogs, currentUser: res.currentUser });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: err });
      });
  } else {
    Blogs.find({ author: res.currentUser._id })
      .then((blogs) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ blogs: blogs, currentUser: res.currentUser });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: err });
      });
  }
};

const createBlog = (req, res, next) => {
  if (typeof req.file === "undefined") {
    res.status(404);
    return res.json({ message: "file not uploaded" });
  }
  const newBlog = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file.filename,
    author: res.currentUser._id,
  };

  Blogs.create(newBlog)
    .then((blog) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "Blog added successfully", data: blog });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Invalid Object Property", error: err });
    });
};

const getblogById = (req, res, next) => {
  Blogs.findById(req.params.blogId)
    .then((blog) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(blog);
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

const deleteBlog = (req, res, next) => {
  Blogs.findByIdAndRemove(req.params.blogId, { useFindAndModify: false })
    .then((response) => {
      if (response == null) {
        res.status(404);
        res.json({ message: "Id did not exists" });
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json({
        status: "Blog deleted successfully",
        response: response,
      });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

// to make relatedLink field a empty list
const updateRelatedLinks = (req, res, next) => {
  Blogs.updateMany({}, { $set: { links: [] } })
    .then((blog) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(blog);
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "not able to update", error: err });
    });
};

module.exports = {
  getAllBlogs,
  createBlog,
  getblogById,
  deleteBlog,
  updateRelatedLinks,
};
