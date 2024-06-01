const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BorrowRecord = sequelize.define('BorrowRecord', {
  memberId: DataTypes.STRING,
  bookId: DataTypes.STRING,
  borrowDate: DataTypes.DATE,
  returnDate: DataTypes.DATE,
  penaltyEndDate: DataTypes.DATE
});

module.exports = BorrowRecord;
