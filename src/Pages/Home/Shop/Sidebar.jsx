import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import superSale from "../../../images/Super Sale Banner.png"
import plantsData from '../../../data/data.json'


const categories = [ 
    { name: "House Plants", count: 33 },
    { name: "Potter Plants", count: 12 },
    { name: "Seeds", count: 65 },
    { name: "Small Plants", count: 29 },
    { name: "Big Plants", count: 23 },
    { name: "Succulents", count: 17 },
    { name: "Terrariums", count: 19 },
    { name: "Gardening", count: 13 },
    { name: "Accessories", count: 18 }
]



const Sidebar = ({price,setPrice, activeCategory, setActiveCategory}) => {

  const productCount = (category)=>{
      return plantsData.plants.filter((plant)=> plant.categories.includes(category)).length
  };
  const handleRangeChange = (e) => {
    setPrice(e.target.value); 
  };
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState('');

  return (
    <div className={styles.sidebar}>

      <div className={styles.section}>
        <h3>Categories</h3>
        <ul className={styles.categoryList}>
           {categories.map((category)=>(
          <li 
          onClick={() => {
            setActiveCategory(category.name);
            setActive(category.name);
          }} 
          className={activeCategory === category.name ? styles.active : ""}
        >
          {category.name} <span>{productCount(category.name)}</span>
        </li>
        
           ))}
        <li onClick={() => setActiveCategory('All')}>All Categories</li>
        </ul>
      </div>


      <div className={styles.section}>
        <h3>Price Range</h3>
        <input 
        type="range" 
        min="0" 
        max="300" 
        value={price} 
        onChange={handleRangeChange}
        className={styles.range} />
         <p className={styles.price}>
          Price: <span>${price} - $300</span> 
        </p>
        
        <button className={styles.filterBtn}>Filter</button>
      </div>

   
      <div className={styles.section}>
        <h3>Size</h3>
        <ul className={styles.sizeList}>
          <li>Small <span>(119)</span></li>
          <li>Medium <span>(86)</span></li>
          <li>Large <span>(78)</span></li>
        </ul>
      </div>

      <div className={styles.saleBanner}>
        <h2>Super Sale</h2>
        <p>UP TO 75% OFF</p>
        <img src={superSale} alt="Sale" />
      </div>
    </div>
  );
};

export default Sidebar;
