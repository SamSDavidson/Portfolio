'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',  
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',  
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};