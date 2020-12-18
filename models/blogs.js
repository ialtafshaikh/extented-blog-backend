const mongoose = require("mongoose");
const uniquid = require("uniquid");
const Schema = mongoose.Schema;

const relatedLinks = new Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const blogSchema = new Schema(
  {
    blogID: {
      type: String,
      default: uniquid(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    links: [relatedLinks],
  },
  {
    timestamps: true,
  }
);

var Blogs = mongoose.model("Blog", blogSchema);

module.exports = Blogs;
