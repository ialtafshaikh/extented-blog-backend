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
    req.select._id = 0;
    req.select.author = 0;
    Blogs.find({ author: res.currentUser._id })
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
  }
};

const createBlog = (req, res, next) => {
  const newBlog = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.image,
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
  Blogs.findOne({ blogID: req.params.blogId })
    .select({ _id: 0 })
    .then((blog) => {
      if (blog.author == res.currentUser._id) {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(blog);
      } else {
        res.status(401);
        res.json({ message: "unauthorized operation" });
      }
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

const updateBlog = (req, res, next) => {
  Blogs.findOne({ blogID: req.params.blogId })
    .then((blog) => {
      if (blog.author == res.currentUser._id) {
        //to get th updated doc u need to use findByIDAndUpdate()
        Blogs.updateOne(
          { blogID: req.params.blogId },
          {
            $set: req.update,
          }
        )
          .then((response) => {
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.json(response);
          })
          .catch((err) => {
            res.status(404);
            res.json({ message: "unable to update", error: err });
          });
      } else {
        res.status(401);
        res.json({ message: "unauthorized operation" });
      }
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

const deleteBlog = (req, res, next) => {
  Blogs.findOne({ blogID: req.params.blogId })
    .then((blog) => {
      if (blog.author == res.currentUser._id) {
        Blogs.deleteOne({ blogID: req.params.blogId })
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
            res.json({ message: "unable to delete", error: err });
          });
      } else {
        res.status(401);
        res.json({ message: "unauthorized operation" });
      }
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

// to make relatedLink field a empty list
const populateRelatedLinks = (req, res, next) => {
  Blogs.find({})
    .select({ _id: 0, blogID: 1 })
    .then((blogs) => {
      if (blogs.length == 0 || blogs.length < 2) {
        res.status(404);
        res.json({
          message: "no sufficient blogs to populate links",
        });
      }
      Blogs.updateMany(
        {},
        {
          $set: {
            links: blogs.slice(Math.floor(Math.random() * blogs.length, 3)),
          },
        }
      )
        .then((response) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => {
          res.status(404);
          res.json({ message: "not able to update", error: err });
        });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "unable to populate links", error: err });
    });
};

module.exports = {
  getAllBlogs,
  createBlog,
  getblogById,
  updateBlog,
  deleteBlog,
  populateRelatedLinks,
};
