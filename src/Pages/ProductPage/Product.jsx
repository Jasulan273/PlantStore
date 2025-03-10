import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import plantsData from '../../data/data.json';
import plantIMG from "../../images/banner.png";
import styles from './Product.module.css';
import Button from '../../components/UI/Button';
import facebook from '../../images/Facebook.png';
import twitter from '../../images/Twitter.png';
import linkedin from '../../images/Linkedin.png';
import union from '../../images/Union.png';
import instagram from '../../images/Instagram.png';

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
  const [count, setCount] = useState(1);
    // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useLocalStorage("cartItems", []);
  const [showAlert, setShowAlert] = useState(false);

  const { productId } = useParams();
  const productIdNumber = Number(productId);
  const product = plantsData.plants.find((plant) => plant.id === productIdNumber);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (count < 1) {
    setCount(1);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
     <AnimatePresence>
  {showAlert && (
    <motion.div
      className={styles.notification}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      Product added to cart
    </motion.div>
  )}
</AnimatePresence>


      <motion.div
        className={styles.productWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.imageSection}>
          <div className={styles.thumbnailWrapper}>
            {[plantIMG, plantIMG, plantIMG].map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="thumbnail"
                className={styles.thumbnail}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
          <motion.img
            src={plantIMG}
            alt={product.name}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.price}>
            {product.price !== undefined ? `$${product.price.toFixed(2)}` : "No avaliable"}
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
                <motion.button
                  key={size}
                  className={styles.sizeButton}
                  whileTap={{ scale: 0.9 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div className={styles.quantitySection}>
            <div className={styles.quantityBox}>
              <Button text="-" onClick={() => setCount(count - 1)} width="25px" height="25px" />
              <span className={styles.count}>{count}</span>
              <Button text="+" onClick={() => setCount(count + 1)} width="25px" height="25px" />
            </div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button text="BUY NOW" width="130px" height="40px" />
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                text="ADD TO CART"
                onClick={() => {
                  setShowAlert(true);
                  setCart((prevCart) => {
                    const existingItem = prevCart.find(item => item.id === productId);
                    if (existingItem) {
                      return prevCart.map(item =>
                        item.id === productId ? { ...item, quantity: item.quantity + count } : item
                      );
                    } else {
                      return [...prevCart, { id: productId, name: product.name, quantity: count, price: product.price }];
                    }
                  });
                }}
                width="130px"
                height="40px"
              />
            </motion.div>
          </div>

          <div className={styles.extraInfo}>
            <p><strong>SKU:</strong> 199571877966</p>
            <p><strong>Categories:</strong> {product.categories.join(', ')}</p>
            <p><strong>Tags:</strong> Home, Garden, Plants</p>
          </div>

          <div className={styles.shareSection}>
            <span>Share this product:</span>
            <div className={styles.social}>
              {[facebook, union, instagram, linkedin, twitter].map((icon, index) => (
                <motion.img
                  key={index}
                  src={icon}
                  alt=""
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.descriptionSection}>
        <h3 className={styles.sectionTitle}>Care Instructions</h3>
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
