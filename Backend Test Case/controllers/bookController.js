const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

module.exports = {
  getAllBooks
};
