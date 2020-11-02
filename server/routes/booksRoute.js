import express from 'express';
import Books from '../models/booksModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// GET API to findAll
router.get('/', async (req, res) => {
  const book = await Books.find({ });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not Found.' });
  }
});

// GET API to findOne by ID
router.get('/:id', async (req, res) => {
  const book = await Books.findOne({ productId: req.params.id });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not Found.' });
  }
});

// GET API to findAll by searchKeyword and category
router.get('/category', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
      name: {
        $regex: req.query.searchKeyword,
        $options: 'i',
      },
    }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const books = await Books.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(books);
});

// DELETE API to findOne by ID and delete
router.delete('/:id', async (req, res) => {
  const deletedBook = await Books.findById(req.params.id);
  if (deletedBook) {
    await deletedBook.remove();
    res.send({ message: 'Book Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

// POST API to findOne by ID and delete
router.post('/add', async (req, res) => {
  const book = new Books({
    productId: req.body.productId,
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors,
    category: req.body.category,
    image: req.body.image,
    link: req.body.link,
    price: req.body.price,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  const newBook = await Books.save();
  if (newBook) {
    return res
      .status(201)
      .send({ message: 'New Book Created', data: newBook });
  }
  return res.status(500).send({ message: ' Error in Creating Book.' });
});

export default router;
