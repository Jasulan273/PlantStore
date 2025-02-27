import React from "react";
import { useState } from 'react'
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import styles from "./Shop.module.css";

const Shop = () => {
  const [price, setPrice] = useState(0); 
  const [activeCategory , setActiveCategory] = useState('All');

  return (
    <div className="container">
      <div className={styles.shop}>
        <Sidebar price={price} setPrice={setPrice} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <ProductList price={price} activeCategory={activeCategory}/>
      </div>
    </div>
  );
};

export default Shop;
