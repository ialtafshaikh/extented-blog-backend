const Blogs = require("../models/blogs");

// to populate relatedLink field with blog ids
const populateRelatedLinks = async () => {
  Blogs.find({})
    .select({ _id: 0, blogID: 1 })
    .then((blogs) => {
      if (blogs.length == 0 || blogs.length < 2) {
        return false;
      }
      Blogs.updateMany(
        {},
        {
          $push: {
            links: {
              $each: blogs.slice(Math.floor(Math.random() * blogs.length, 3)),
            },
          },
        }
      )
        .then((response) => {
          return true;
        })
        .catch((err) => {
          return false;
        });
    })
    .catch((err) => {
      return false;
    });
};

module.exports = populateRelatedLinks;
