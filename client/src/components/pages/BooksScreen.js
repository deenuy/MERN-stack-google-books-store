import React, { useState, useEffect } from 'react';
// import data from '../data'; /* Static Data object */
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listBooks } from '../../redux/actions/booksActions';

function BooksScreen (props){
  
  // Add hooks
  const booksList = useSelector(state => state.booksList);
  // console.log(JSON.stringify(booksList));
  const { books, loading, error } = booksList;
  const dispatch = useDispatch();
  const [source, setSource] = useState('db');

  useEffect(() => {
    console.log("Effect has been run");
    
    dispatch(listBooks(source));
    
    return () => {
      // 
    }
  }, [])

  return loading? <div>Loading...</div> : 
    error? <div>{error}</div> :
    // Home screen container
    <div className="homescreen-container" >
      <div className="product-container">
        <p className="product-results">My Saved Collections</p>
        <ul className="products">
          {
            books.map(book => 
            // To get the li with unique key product id
            <li key={book._id}>
              <div className="product">
                <Link to={"/api/books/" + book._id}>
                <img className="product-image" src={book.image} alt="product_image"/>
                </Link>
                <div className="product-name">
                  <Link to={"/product/" + book._id}>
                  {book.title}</Link>
                </div>
                <div className="product-brand">Genre: {book.category}</div>
                <div className="product-price">Author: {book.authors}</div>
                <div className="product-rating">{book.rating} Stars ({book.numReviews})</div>
              </div>
            </li>
            )
          }            
        </ul>
      </div>
    </div>
}

export default BooksScreen;