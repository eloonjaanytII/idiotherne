const {DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');
const { User } = require('./User.js');
const { Film } = require('./Film.js');

const UserFilms = sequelize.define(
  'UserFilms',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    },
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Film,
        key: "kinopoiskId"
      }
    },
    isWatched: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 10},
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
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
);

module.exports = {UserFilms};