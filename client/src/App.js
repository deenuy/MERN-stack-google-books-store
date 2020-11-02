import React, {useState, useEffect} from 'react';
import './App.css';
// import data from './data';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import BooksScreen from './components/pages/BooksScreen.js'
import HomeScreen from './components/pages/HomeScreen';
import ProductScreen from './components/pages/ProductScreen';

// fontawesome Explicit import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { QueryCursor } from 'mongoose';

function App() {
  //functions for side menu
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  // Google book api ajax request
  const[googleBooks, setGoogleBooks] = useState([]);
  const[search, setSearch] = useState("");
  const[query, setQuery] = useState('react');

  useEffect(() =>{
    console.log("Effect has been run");
    getBooks();
  }, [query]);

  const getBooks = async () => {
    console.log("Search is initiated")
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    console.log('Number of books found: '+data.totalItems)
    setGoogleBooks(data.items);
    console.log(data.items);

    fs.writeFileSync('./output/README.md', result, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(error.message);
      }
      console.log('\n\nREADME.md is successfully generated!\n');
    });
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //To stop page refresh
    setQuery(search);
  }



  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/">Google Book Store</Link>
          </div>
          <div className="search-block">
            <div className="search-panel">
              <input type="text" value={search} onChange={updateSearch} placeholder="Search books from Google API" className="search-input"/>
            </div>
            {/* <button type="submit" className="search-button">Search</button> */}
            <FontAwesomeIcon icon={faSearch} onClick={getSearch} style={{width: "10rem", height: "2.8rem", paddingTop: ".6rem", cursor: "pointer"}} />
          </div>
          <div className="header-links">
            <a href="services.html">Services</a>
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
          </div>
        </header>
        <aside className="sidebar">
          <a href="index.html" id="hmenu-customer-profile-link" onClick="$Nav.getNow('signInRedirect')('nav_em_hd_re_signin', 'https://www.amazon.ca/ap/signin?openid.pape.max_auth_age=0&amp;openid.return_to=https%3A%2F%2Fwww.amazon.ca%2F%3F_encoding%3DUTF8%26ref_%3Dnav_em_hd_re_signin&amp;openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.assoc_handle=caflex&amp;openid.mode=checkid_setup&amp;openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&amp;&amp;ref_=nav_em_hd_clc_signin', 'nav_em_hd_clc_signin')" data-nav-ref="nav_em_hd_re_signin">
            <div id="hmenu-customer-profile">
              <div className="customer-profile"> <span className="profile-icon"><i className="far fa-user-circle"></i></span> Hello, Sign in</div>
              <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            </div>
          </a>    
          <div className="hmenu-header">Find by Genre</div>
          <ul className="hmenu-content">
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Mystery&Thriller
                <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Historical&Fiction
                <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
            <li>
              <a href="index.html" className="hmenu-item" data-menu-id="1">
                Romance
                <i className="fas fa-chevron-right hmenu-icon"></i>
              </a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={BooksScreen} />
          </div>
        </main>
        <footer className="footer">
          © Copyright - Deenu's Portfolio Work
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
