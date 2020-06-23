const { Posts, Sequelize } = require('../models');
const { throwError } = require('../util/errorHandling')

// fetch all posts
exports.getAll = async (req, res, next) => {
  try {
    const posts = await Posts.findAll().catch(
      throwError(500, 'Database failure! Once more!')
    );
    res.status(200).json(posts);
  } catch (e) {
    next(e);

  }
}

// fetch single post
exports.getOneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByPk(id)
      .then(throwIf(row => !row, 404, 'This post is not here!'), throwError(500, 'Database failure! Once more!'))
    res.status(200).json(post)
  } catch (e) {
    next(e);
  }
}

// create a post
exports.createPost = async (req, res, next) => {
  const { title, content, userId } = req.body;
  try {
    const newPost = await Post.create({ title, content, userId })
      .catch(
        Sequelize.ValidationError,
        throwError(406, 'Error with validating!')
          .catch(
            Sequelize.BaseError,
            throwError(500, 'We encountered an oopsie, try again!'))
      );
    res.status(201).json({ id: newPost.id })
  } catch (e) {
    next(e)
  }
};

// update a post
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [, [updatedPost]] = await Posts.update(req.body, {
      where: { id },
      returning: true
    });
    res.status(201).json(updatedPost);
  } catch (e) {
    next(e);
  }
}

// remove
exports.removePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Posts.destroy({ where: { id } });
    res.sendStatus(200);
  }
  catch (e) {
    next(e)
  }
}
