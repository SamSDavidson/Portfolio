'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        onDelete: 'CASCADE',
      },
      commentCount: {
        type: Sequelize.INTEGER,
      },
      totalVotes: {
        type: Sequelize.INTEGER,
      },
      votes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      user: {
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
    return queryInterface.dropTable('Posts');
  }
};