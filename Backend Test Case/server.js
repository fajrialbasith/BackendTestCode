const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Initialize Sequelize
const sequelize = new Sequelize('sqlite::memory:');

// Define models
const Book = sequelize.define('Book', {
  code: { type: DataTypes.STRING, primaryKey: true },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  stock: DataTypes.INTEGER
});

const Member = sequelize.define('Member', {
  code: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING
});

const BorrowRecord = sequelize.define('BorrowRecord', {
  memberId: DataTypes.STRING,
  bookId: DataTypes.STRING,
  borrowDate: DataTypes.DATE,
  returnDate: DataTypes.DATE,
  penaltyEndDate: DataTypes.DATE
});

// Sync database
sequelize.sync();

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API for managing library books and members'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.post('/borrow', async (req, res) => {
  // Implement borrowing logic
});

app.post('/return', async (req, res) => {
  // Implement return logic
});

app.get('/books', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get('/members', async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
