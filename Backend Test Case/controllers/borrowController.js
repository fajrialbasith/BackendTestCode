const BorrowRecord = require('../models/borrowRecord');
const Book = require('../models/book');
const Member = require('../models/member');
const { Op } = require('sequelize');

const borrowBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  const member = await Member.findByPk(memberId);
  const book = await Book.findByPk(bookId);

  if (!member || !book) {
    return res.status(404).send('Member or Book not found');
  }

  const activeBorrows = await BorrowRecord.count({
    where: {
      memberId,
      returnDate: null
    }
  });

  if (activeBorrows >= 2) {
    return res.status(400).send('Member cannot borrow more than 2 books');
  }

  const isBookBorrowed = await BorrowRecord.findOne({
    where: {
      bookId,
      returnDate: null
    }
  });

  if (isBookBorrowed) {
    return res.status(400).send('Book is already borrowed by another member');
  }

  const isPenalized = await BorrowRecord.findOne({
    where: {
      memberId,
      penaltyEndDate: {
        [Op.gt]: new Date()
      }
    }
  });

  if (isPenalized) {
    return res.status(400).send('Member is currently penalized');
  }

  await BorrowRecord.create({
    memberId,
    bookId,
    borrowDate: new Date()
  });

  res.send('Book borrowed successfully');
};

const returnBook = async (req, res) => {
  const { memberId, bookId } = req.body;
  const borrowRecord = await BorrowRecord.findOne({
    where: {
      memberId,
      bookId,
      returnDate: null
    }
  });

  if (!borrowRecord) {
    return res.status(400).send('Book was not borrowed by the member');
  }

  const borrowDate = new Date(borrowRecord.borrowDate);
  const returnDate = new Date();
  let penaltyEndDate = null;

  if ((returnDate - borrowDate) / (1000 * 60 * 60 * 24) > 7) {
    penaltyEndDate = new Date(returnDate);
    penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
  }

  await borrowRecord.update({
    returnDate,
    penaltyEndDate
  });

  res.send('Book returned successfully');
};

module.exports = {
  borrowBook,
  returnBook
};
