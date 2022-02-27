const { Post } = require('../models');

class PostsService {
  async create(postData) {
    const newPost = await Post.create(postData);
    return newPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }
}

module.exports = PostsService;
