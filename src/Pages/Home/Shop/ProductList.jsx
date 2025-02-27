import React from "react";
import styles from "./ProductList.module.css";
import plantIMG from "../../../images/banner.png"
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import plantsData from '../../../data/data.json';
import Button from '../../../components/UI/Button'


export const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default");

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)} 
        text={`${selectedSort} ▼`} 
        width="120px" 
        height="30px" 
      />

      {isOpen && (
        <ul>
          <li 
            onClick={() => handleSortChange("Price: Low to High")}
          >
           Low to High
          </li>
          <li
            onClick={() => handleSortChange("Price: High to Low")}
          >
            High to Low
          </li>
        </ul>
      )}
    </div>
  );
};




const plants = plantsData.plants


const ProductList = ({ price, activeCategory}) => {
  const [activePage, setActivePage] = useState(1);

  const sortedProduct = useMemo(() => {
    return plants.filter((plant) => plant.price > price)
  }, [price]);
  
  const sortedbyCategory = useMemo(() =>{
    if(activeCategory==="All"){
      return sortedProduct
    }
    else{
      return sortedProduct.filter((plant)=> plant.categories.includes(activeCategory))
    }
  },[activeCategory,sortedProduct]);

  const shortText = (text) => {
       return text.slice(0,50)+"..."
  }
  


  const productPerPage = 6

  const paginatedProduct = useMemo(()=>{
    const startIndex = (activePage-1) * productPerPage
    const endIndex = startIndex + productPerPage
    return sortedbyCategory.slice(startIndex,endIndex)
  },[activePage,sortedbyCategory])
   
  const totalPage = Math.ceil(sortedbyCategory.length / productPerPage)
  


  return (
    <div className={styles.productListBlock}><div className={styles.sortBy}><SortDropdown /></div>
  
      <div className={styles.productList}>

        {paginatedProduct.map((plant, index) => (
          <div key={index} className={styles.productCard}>
            <img src={plantIMG} alt={plant.name} className={styles.productImage} />
            <div className={styles.productDetails}>
              {plant.id ? (
                <NavLink to={`/product/${plant.id}`} className={styles.navlink}>
                  <h4 className={styles.productTitle}>{plant.name}</h4>
                </NavLink>
              ) : (<span className="text-gray-500">Details not available</span>)}
           
              <p className={styles.productDescription}>{shortText(plant.description)}</p>



              <p className={styles.productPrice}>${plant.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {[...Array(totalPage)].map((_,num) =>(
            <button
            key={num+1}
            className={`${styles.paginationNum} ${activePage === num+1 ? styles.active : ''}`}
            onClick={() => setActivePage(num+1)}
          >
            {num+1}
          </button>
        ))}
        <button className={`${styles.paginationNum}`} onClick={() => setActivePage((prev) => Math.min(prev + 1, 4))}>&gt;</button>
      </div>
    </div>

  );
};

export default ProductList;
