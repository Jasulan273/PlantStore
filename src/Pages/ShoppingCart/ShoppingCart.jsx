import React, { useState, useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import Button from "../../components/UI/Button";
import plantIMG from "../../images/banner.png";
import { useLocalStorage } from "../ProductPage/Product";


const ShoppingCart = () => {
  const [cartItems, setCart] = useLocalStorage("cartItems", []);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setProductCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 16;
  const total = subtotal + shipping;

  return productCount > 0 ? (
    <div className="container">
      <div className={styles.cartContent}>
        <div className={styles.cartItemsContainer}>
          <div className={styles.cartHeader}>
            <span>Products</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.productInfo}>
                  <img src={plantIMG} alt={item.name} className={styles.productImage} />
                  <div>
                    <div className={styles.productName}>{item.name}</div>
                  </div>
                </div>
                <span>{item.price}$</span>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => {
                      setCart(prevCart =>
                        prevCart.map(i =>
                          i.id === item.id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
                        )
                      );
                    }}
                    disabled={item.quantity <= 1}
                    className={styles.quantityButton}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => {
                      setCart(prevCart =>
                        prevCart.map(i =>
                          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        )
                      );
                    }}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                <span className={styles.totalAmount}>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className={styles.trashButton}
                  onClick={() => setCart(cartItems.filter(i => i.id !== item.id))}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>{subtotal}$</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>{shipping}$</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>{total}$</span>
          </div>
          <Button text={"Clear All"} onClick={() => setCart([])} width={"100%"} height={"40px"} />
          <br />
          <Button text={"Proceed To Checkout"} width={"100%"} height={"40px"} />
        </div>
      </div>
    </div>) : (<div className="container">Your car is empty</div>)
};

export default ShoppingCart;
