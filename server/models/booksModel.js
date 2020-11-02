// Product Model holds all the products available in the virtual pet store.
// Admin users will be able to do all the CRUD operations on this model.
// Ordinary users (Buyers) can only read it.
import mongoose from 'mongoose';
const booksSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true},
    description: { type: String, required: true },
    authors: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Books = mongoose.model('books', booksSchema);

export default Books;
