const Blogs = require("../models/blogs");

const getAllBlogs = (req, res, next) => {
  if (Object.keys(req.query).length != 0) {
    req.query._id = 0;
    Blogs.find({})
      .select(req.query)
      .then((blogs) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ blogs: blogs, currentUser: "" });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: err });
      });
  } else {
    Blogs.find({})
      .then((blogs) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ blogs: blogs, currentUser: "" });
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
    imageUrl: req.file.path,
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
  updateRelatedLinks,
};
