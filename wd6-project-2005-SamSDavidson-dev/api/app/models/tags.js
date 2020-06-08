'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    name: { 
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Tag Title is required to be at least 3 characters' },
      }
    },
    icon: {
      type: DataTypes.STRING,
      validate:{
        len: { args: [3, 500], msg: 'Tag Title is required to be at least 3 characters' },
      }
    },
    lastPostAt: {
      type: DataTypes.DATE,
      validate:{
        allowNull: false,
      }
    },
    count:{
      type: DataTypes.INTEGER,
      validate:{
        allowNull: false,
      }
    }
  }, {});
  Tags.associate = function(models) {
    // associations can be defined here
    Tags.belongsTo(models.Users, {foreignKey: 'Tags'})
    Tags.belongsTo(models.Posts, {foreignKey: 'Tags'})
  };
  return Tags;
};