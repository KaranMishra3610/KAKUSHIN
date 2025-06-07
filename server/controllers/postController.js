const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  const post = new Post({ caption, imageUrl, createdBy: req.user.id });
  await post.save();
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('createdBy', 'name');
  res.json(posts);
};
