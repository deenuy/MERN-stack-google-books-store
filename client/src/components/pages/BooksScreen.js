import React, { useState, useEffect } from 'react';
// import data from '../data'; /* Static Data object */
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listBooks } from '../../redux/actions/booksActions';

function BooksScreen (props){
  // Add hooks
  // const [books, setProduct] = useState([]);
  const bookList = useSelector(state => state.bookList);
  const { books, loading, error } = bookList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBooks())

    // const fetchData = async () => {
    //   const {data} = await axios.get("api/books");
    //   setProduct(data);
    //   console.log(data);
    // }
    
    // fetchData();

    return () => {
      // 
    }
  }, [])

  return loading? <div>Loading...</div> : 
    error? <div>{error}</div> :
    // Home screen container
    <div className="homescreen-container" >
      <div className="product-container">
        <p className="product-results">1 - 48 of 5606 results</p>
        <ul className="products">
          {
            books.map(book => 
            // To get the li with unique key product id
            <li key={books._id}>
              <div className="product">
                <Link to={"/api/books/" + books._id}>
                <img className="product-image" src={books.image} alt="product_image"/>
                </Link>
                <div className="product-name">
                  <Link to={"/product/" + books._id}>
                  {books.name}</Link>
                </div>
                <div className="product-brand">{books.category}</div>
                <div className="product-price">${books.price}</div>
                <div className="product-rating">{books.rating} Stars ({books.numReviews})</div>
              </div>
            </li>
            )
          }            
        </ul>
      </div>
    </div>
}

export default BooksScreen;