import React from 'react';
import { Routes, Route} from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import Product from './Pages/ProductPage/Product';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      <Header />
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
