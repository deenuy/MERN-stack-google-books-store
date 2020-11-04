import axios from 'axios';

const { default: Axios } = require("axios");
const { BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL } = require("../constants/booksConstants")


const listBooks = (source) => async (dispatch) => {
    var googleBooksObj = {};

    const getBooks = async () => {
        console.log("Search is initiated")
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${'react'}`);
        const data = await response.json();
        console.log('Number of books found: '+data.totalItems)
        console.log(data.items);
        console.log(data.items[0].saleInfo.listPrice.amount)
        console.log(data.items[0].volumeInfo.authors[0])
        console.log(data.items[0].volumeInfo.canonicalVolumeLink)
        console.log(data.items[0].volumeInfo.categories[0])
        console.log(data.items[0].volumeInfo.description)
        console.log(data.items[0].volumeInfo.imageLinks.smallThumbnail)
        console.log(data.items[0].volumeInfo.title)

        return data.items;
    }

    if(source === "api"){

        dispatch({type: BOOK_LIST_REQUEST});
        const {data} = getBooks();

        dispatch({type: BOOK_LIST_SUCCESS, payload: data})
        
    } else{
       
        try{
            dispatch({type: BOOK_LIST_REQUEST});
            const {data} = await axios.get("/api/books");
            dispatch({type: BOOK_LIST_SUCCESS, payload: data})
        }
        catch(error){
            dispatch({type: BOOK_LIST_FAIL, payload: error.messages})
        }

    }

    

}

const detailsBook = (bookId) => async (dispatch) => {
    console.log(bookId);
    try{
        dispatch({type: BOOK_DETAILS_REQUEST, payload: bookId});
        const {data} = await axios.get("/api/books/" + bookId);
        console.log(data);
        dispatch({type: BOOK_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: BOOK_DETAILS_FAIL, payload: error.message});
    }
}

export {listBooks, detailsBook}