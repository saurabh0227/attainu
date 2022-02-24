const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    active: { type: Boolean, default: true },
    post: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
