const PostsService = require('../services/postsService');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  create = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        res.status(400).json({
          message: 'Incorrect data',
        });
        return;
      }

      const newPost = this.postsService.create({
        title,
        description,
      });

      res.json(newPost);
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getAll = async (req, res, next) => {
    try {
      const posts = await this.postsService.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostsController;
