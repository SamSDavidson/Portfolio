'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'username is required to be at least 3 characters' },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        allowNull: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'City is required to be at least 3 characters' },
      },
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'State is required to be at least 3 characters' },
      },
    },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Posts, {foreignKey: 'userId'})
    Users.hasMany(models.Comments, {foreignKey: 'userId'})
    Users.hasMany(models.Tags, {foreignKey: 'tagId'})
    
  };
  return Users;
};