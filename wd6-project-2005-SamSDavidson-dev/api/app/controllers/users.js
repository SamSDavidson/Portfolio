const { Users, Sequelize } = require('../models')
const { throwError } = require('../util/errorHandling');

// imports
const bcrypt = require('bcrypt');
const _ = require('lodash');
const bson = require('bson');
const jwt = require('jsonwebtoken')



const generateToken = function (username) {
  return jwt.sign({ name: username }, config.secret, { expiresIn: '100m' });
}

exports.register = async (req, res, next) => {
  try {
    const { username, avatar, city, state, password } = req.body;
    if (!username || !password) {
      return throwError(400, 'Cannot register, provide username and password');
    }
    Users
      .findOne({ name: username })
      .exec()
      .then(function (user) {
        if (user) {
          return throwError(500, 'Username already exists')
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function (err, hash) {
          const user = new Users({
            username: username,
            password: hash,
            city: city,
            state: state,
            avatar: avatar,
          });
          user.save(function (err) {
            if (err) throwError(500, err);
            return res.json({ success: true, message: 'User Registered' })
          });
        })
      })
  } catch (e) {
    next(e);
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const data = { ...req.body.user }
    const username = data.username;
    const password = data.password;

    if (_.isUndefined(username) || _.isUndefined(password)) {
      return throwError(500, 'Authentication failed')
    }

    Users
      .findOne({ name: username })
      .exec()
      .then(function (user) {
        if (!user) {
          return throwError(500, 'Authentication failed');
        }

        bcrypt.compare(password, user.password, function (errBycrypt, resBcrypt) {
          if (resBcrypt == false) {
            return throwError(500, 'Authentication failed, Password no good');
          }
        })
      })
  } catch (e) {
    next(e);
  }
}
// fetch all
exports.getAll = async (req, res, next) => {
  try {
    const users = await Users.findAll().catch(
      throwError(500, 'Database failure! Once more!')
    );
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}

// fetch single
exports.getOneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id)
      .then(throwIf(row => !row, 404, 'Peekaboo, this tag is not here!'), throwError(500, 'Database failure! Once more!'))
    res.status(200).json(user)
  } catch (e) {
    next(e);
  }
}

// create
exports.createUser = async (req, res, next) => {
  const { username, avatar, city, state, password } = req.body;
  try {
    const newUser = await Users.create({ username, avatar, city, state, password })
      .catch(
        Sequelize.ValidationError,
        throwError(406, 'Error with validating!')
          .catch(
            Sequelize.BaseError,
            throwError(500, 'We encountered an oopsie, try again!'))
      );
    res.status(201).json({ id: newUser.id })
  } catch (e) {
    next(e)
  }
};

// update a post
exports.updateUser = async (req, res, next) => {

  const { id } = req.params;

  try {
    const [, [updatedUser]] = await Users.update(req.body, {
      where: { id },
      returning: true
    });
    res.status(201).json(updatedUser);
  } catch (e) {
    next(e);
  }
}

// remove
exports.removeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Users.destroy({ where: { id } });
    res.sendStatus(200);
  }
  catch (e) {
    next(e)
  }
}

