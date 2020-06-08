const { Comments, Sequelize } = require('../models')
const { throwError } = require('../util/errorHandling');

// fetch all
exports.getAll = async (req, res, next) => {
  try {
    const comments = await Comments.findAll().catch(
      throwError(500, 'Database failure! Once more!')
    );
    res.status(200).json(comments);
  } catch (e) {
    next(e);

  }
}

// fetch single
exports.getOneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findByPk(id)
      .then(throwIf(row => !row, 404, 'Peekaboo, this comment is not here!'), throwError(500, 'Database failure! Once more!'))
    res.status(200).json(comment)
  } catch (e) {
    next(e);
  }
}

exports.getCommentsByPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comments.findAll({ where: { postId: id } })
      .catch(
        throwError(404, 'No comments are found for zis post!')
      )
    res.json(comments)
  } catch(e){
    next(e);
  }
}

// create
exports.createComment = async (req, res, next) => {
  const { content, userId } = req.body;
  try {
    const newComment = await Comments.create({ content, userId })
      .catch(
        Sequelize.ValidationError,
        throwError(406, 'Error with validating!')
          .catch(
            Sequelize.BaseError,
            throwError(500, 'We encountered an oopsie, try again!'))
      );
    res.status(201).json({ id: newComment.id })
  } catch (e) {
    next(e)
  }
};

// update a post
exports.updateComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [, [updatedComment]] = await Comments.update(req.body, {
      where: { id },
      returning: true
    });
    res.status(201).json(updatedComment);
  } catch (e) {
    next(e);
  }
}

// remove
exports.removeComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Comments.destroy({ where: { id } });
    res.sendStatus(200);
  }
  catch (e) {
    next(e)
  }
}

