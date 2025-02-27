import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import plantsData from '../../data/data.json';
import plantIMG from "../../images/banner.png";
import styles from './Product.module.css';
import Button from '../../components/UI/Button'
import facebook from '../../images/Facebook.png'
import twitter from '../../images/Twitter.png'
import linkedin from '../../images/Linkedin.png'
import union from '../../images/Union.png'
import instagram from '../../images/Instagram.png'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}

const Product = () => {
  const [count , setCount] = useState(1)
  const [cart, setCart] = useLocalStorage("cartItems",[]);
 
  const { productId } = useParams();
  const productIdNumber = Number(productId);
  const product = plantsData.plants.find((plant) => plant.id === productIdNumber);
  if(count<1){
    return setCount(1)
  }
  if (!product) {
    return <div>Product not found</div>;
  }


  return (
    <div className="container">
      <div className={styles.productWrapper}>

        <div className={styles.imageSection}>
          <div className={styles.thumbnailWrapper}>
            {[plantIMG, plantIMG, plantIMG].map((img, index) => (
              <img key={index} src={img} alt="thumbnail" className={styles.thumbnail} />
            ))}
          </div>
          <img src={plantIMG} alt={product.name} className={styles.mainImage} />
        </div>


        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.price}>
  {product.price !== undefined ? `$${product.price.toFixed(2)}` : "Нет цены"}
</p>

          <div className={styles.reviewSection}>
            <span className={styles.starRating}>★★★★★</span>
            <span>19 Customer Reviews</span>
          </div>
          <p className={styles.description}>{product.description}</p>


          <div className={styles.sizeSelector}>
            <h4>Size:</h4>
            <div>
              {['S', 'M', 'L'].map((size) => (
                <button key={size} className={styles.sizeButton}>{size}</button>
              ))}
            </div>
          </div>

          <div className={styles.quantitySection}>
            <div className={styles.quantityBox}>
            <Button text={"-"} onClick={()=>{setCount(count-1)}} width={"25px"} height={"25px"}/>
              <span className={styles.count}>{count}</span>
              <Button text={"+"} onClick={()=>{setCount(count+1)}} width={"25px"} height={"25px"}/>
            </div>
            <Button text={"BUY NOW"} width={"130px"} height={"40px"}/>
            <Button text={"ADD TO CART"} 
  onClick={() => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + count } : item
        );
      } else {
        return [...prevCart, { id: productId,name:product.name, quantity: count, price: product.price }];
      }
    });
  }} 
  width={"130px"} height={"40px"}
/>

          </div>

          <div className={styles.extraInfo}>
            <p><strong>SKU:</strong> 199571877966</p>
            <p><strong>Categories:</strong> {product.categories.join(', ')}</p>
            <p><strong>Tags:</strong> Home, Garden, Plants</p>
          </div>

          <div className={styles.shareSection}>
            <span>Share this product:</span>
            <div className={styles.social}>
              <img src={facebook} alt="" />
              <img src={union} alt="" />
              <img src={instagram} alt="" />
              <img src={linkedin} alt="" />
              <img src={twitter} alt="" />
            </div>
          </div>
        </div>
      </div>


      <div className={styles.descriptionSection}>
        <h3 className={styles.sectionTitle}>Care Instructions</h3>
        <p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.
          Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. </p> <br />
        <p>{product.description || 'No additional details available.'}</p>
        <ul className={styles.careList}>
          <li className={styles.careItem}><strong>Light:</strong> {product.care.light}</li>
          <li className={styles.careItem}><strong>Water:</strong> {product.care.water}</li>
          <li className={styles.careItem}><strong>Temperature:</strong> {product.care.temperature}</li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
