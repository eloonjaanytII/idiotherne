const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');

const Film = sequelize.define(
  'Film',
  {
    kinopoiskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    nameRu: {
      type: DataTypes.TEXT
    },
    nameEn: {
      type: DataTypes.TEXT
    },
    nameOriginal: {
      type: DataTypes.TEXT,
    },
    posterUrl: {
      type: DataTypes.TEXT,
    },
    coverUrl: {
      type: DataTypes.TEXT,
    },
    ratingKinopoisk: {
      type: DataTypes.FLOAT, 
    },
    year: {
      type: DataTypes.INTEGER , 
    },
    filmLength: {
        type: DataTypes.INTEGER , 
    },
    slogan: {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT
    },
    shortDescription: {
        type: DataTypes.TEXT
    },
    countries: {
        type: DataTypes.JSONB
    },
    genres: {
        type: DataTypes.JSONB
    }
  },
  {
    timestamps: true,
  }
)

module.exports = {Film};

