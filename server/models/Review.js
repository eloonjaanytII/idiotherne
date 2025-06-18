const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Review = sequelize.define(
  'Review',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
    {
      unique: true,
      fields: ['userId', 'kinopoiskId'],
    },
  ],
  }
)

module.exports = {Review};