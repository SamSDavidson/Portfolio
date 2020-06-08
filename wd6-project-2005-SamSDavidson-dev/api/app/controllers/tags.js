const { Tag, Sequelize } = require('../models')
const { throwError } = require('../util/errorHandling');

// fetch all
exports.getAll = async (req, res, next) => {
  try {
    const tags = await Tag.findAll().catch(
      throwError(500, 'Database failure! Once more!')
    );
    res.status(200).json(tags);
  } catch (e) {
    next(e);
  }
}

// fetch single
exports.getOneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id)
      .then(throwIf(row => !row, 404, 'Peekaboo, this tag is not here!'), throwError(500, 'Database failure! Once more!'))
    res.status(200).json(tag)
  } catch (e) {
    next(e);
  }
}

// create
exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newTag = await Tag.create({ name })
      .catch(
        Sequelize.ValidationError,
        throwError(406, 'Error with validating!')
          .catch(
            Sequelize.BaseError,
            throwError(500, 'We encountered an oopsie, try again!'))
      );
    res.status(201).json({ id: newTag.id })
  } catch (e) {
    next(e)
  }
};

// update a post
exports.updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [, [updatedTag]] = await Tag.update(req.body, {
      where: { id },
      returning: true
    });
    res.status(201).json(updatedTag);
  } catch (e) {
    next(e);
  }
}

// remove
exports.removeTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Tag.destroy({ where: { id } });
    res.sendStatus(200);
  }
  catch (e) {
    next(e)
  }
}

