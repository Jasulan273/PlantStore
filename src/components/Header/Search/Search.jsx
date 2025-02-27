import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Search.module.css";
import { NavLink } from "react-router-dom";
import Button from "../../UI/Button";
import plantsData from '../../../data/data.json'
import plantImg from '../../../images/banner.png'

const Search = ({searchBar,setSearchBar}) => {
  const [result, setResult] = useState("");
  const [maxHeight, setMaxHeight] = useState("0px");
  const resultRef = useRef(null);

  const handleChange = (event) => {
    console.log(event.target.value)
    setResult(event.target.value);
  };

  const filterData = useMemo(() => {
    return result
      ? plantsData.plants.filter((plant) =>
          plant.name.toLowerCase().includes(result.toLowerCase())
        )
      : [];
  }, [result]);

  console.log(filterData)

  useEffect(() => {
      if (resultRef.current) {
        if (result) {
          setTimeout(() => {
            setMaxHeight(resultRef.current.scrollHeight + "px");
          }, 100);
        } else {
          setMaxHeight("0px");
        }
      }
    }, [result]);
    

  return (
    <div className={styles.searchSection}>
      <div className={styles.background}></div>
      <div className={styles.search}>
        <div className={styles.searchController}>
          <input
            type="text"
            className={styles.searchInput}
            onChange={handleChange}
          />
          <Button width={"30px"} height={"30px"} text={"X"} onClick={()=>setSearchBar(!searchBar)} />
        </div>
        <div
          className={styles.result}
          ref={resultRef}
          style={{
            maxHeight,
            overflow: "scroll",
          }}
        >
         {filterData.map((plant)=>(
             <NavLink to={`/product/${plant.id}`} onClick={()=>setSearchBar(false)} className={styles.navlink}>
             <div className={styles.searchProduct}>
               <div>
               <img src={plantImg} width="100px" height="100px" alt="" />
               <h4 key={plant.name} className={styles.productTitle}>{plant.name}</h4>
               </div>
                <h4>{plant.price}$</h4>
                </div>
           </NavLink>
         ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
