'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Title is required to be at least 3 characters' },
      },
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Content is required to be at least 3 characters' },
      },
    },
    createdAt: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
      }
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      validate: {
        allowNull: true,
      }
    },
    totalVotes: {
      type: DataTypes.INTEGER,
      validate:{
        allowNull: true,
      }
    },
    votes: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      validate: {
        allowNull: true,
      }
    },
    commentCount: {
      type: DataTypes.INTEGER,
      validate:{
        allowNull: true,
      }
    },
    user: {
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
  }, {});
  Posts.associate = function(models) {
    // associations can be defined here
    Posts.hasMany(models.Tags, {foreignKey: 'Tags'});
    Posts.belongsTo(models.Users, {foriegnKey: 'userId'});
  };
  return Posts;
};