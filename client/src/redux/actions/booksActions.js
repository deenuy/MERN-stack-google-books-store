import axios from 'axios';

const { default: Axios } = require("axios");
const { BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL, BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL } = require("../constants/booksConstants")

const listBooks = () => async (dispatch) => {

    try{
        dispatch({type: BOOK_LIST_REQUEST});
        const {data} = await axios.get("/api/books");
        dispatch({type: BOOK_LIST_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: BOOK_LIST_FAIL, payload: error.messages})
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