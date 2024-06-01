const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  stock: DataTypes.INTEGER
});

module.exports = Book;
