import React from 'react';
import { Routes, Route} from "react-router-dom";
import { useState} from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import Product from './Pages/ProductPage/Product';
import './App.css';
import Search from './components/Header/Search/Search';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';


function App() {
  const [searchBar, setSearchBar] = useState(false)
  return (
    <div className="App">
        {searchBar ? <Search searchBar={searchBar} setSearchBar={setSearchBar} /> : null}
      <Header setSearchBar={setSearchBar} />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/cart' element={<ShoppingCart/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
