import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { bookListReducer, bookDetailsReducer } from './reducers/bookReducer';

const initialState = {};
const reducer = combineReducers({
    booksList: bookListReducer,
    bookDetails: bookDetailsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;