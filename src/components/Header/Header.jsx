import React, { useEffect, useState } from "react";
import Logo from "../../images/Logo.png";
import Cart from "../../images/cart.png";
import Find from "../../images/find.png";
import styles from "./Header.module.css";
import { useLocalStorage } from "../../Pages/ProductPage/Product";

const Header = () => {
  const [cartItems] = useLocalStorage("cartItems", []);
  const [quantity, setQuantity] = useState(0);

  // Функция пересчета товаров
  const updateQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setQuantity(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  useEffect(() => {
    updateQuantity(); // Вызываем сразу

    // Добавляем слушатель на изменения localStorage
    window.addEventListener("storage", updateQuantity);
    
    return () => {
      window.removeEventListener("storage", updateQuantity);
    };
  }, []);

  useEffect(() => {
    updateQuantity(); // Пересчет при изменении cartItems
  }, [cartItems]);

  return (
    <div className="container">
      <nav className={styles.nav}>
        <img src={Logo} className={styles.logo} alt="" />
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/Shop">Shop</a>
          <a href="/Plant">Plant Care</a>
          <a href="/Blogs">Blogs</a>
        </div>
        <div className={styles.icons}>
          <a href="/Find">
            <img src={Find} width="20px" height="20px" alt="" />
          </a>
          <a href="/Cart" className={styles.cart}>
            <img src={Cart} alt="" />
            <h3>{quantity}</h3>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
