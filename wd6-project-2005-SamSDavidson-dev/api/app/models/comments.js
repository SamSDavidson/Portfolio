'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Content is required to be at least 3 characters' },
      }
    },
    createdAt: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
      }
    },
    userId: { 
      type: DataTypes.UUID,
            validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    postId: { 
      type: DataTypes.UUID,
            validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
    Comments.belongsTo(models.Posts, {foreignKey: 'commentId'})
    Comments.belongsTo(models.Users, {foreignKey: 'userId'})
  };
  return Comments;
};