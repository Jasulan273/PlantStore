import React, { useState, useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import Button from "../../components/UI/Button";
import plantIMG from "../../images/banner.png";
import { useLocalStorage } from "../ProductPage/Product";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import emailjs from "@emailjs/browser";

const ShoppingCart = () => {
  const [cartItems, setCart] = useLocalStorage("cartItems", []);
  const [productCount, setProductCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", address: "" });

  useEffect(() => {
    setProductCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 16;
  const total = subtotal + shipping;

  const sendEmail = () => {
    const templateParams = {
      name: userInfo.name,
      email: userInfo.email,
      address: userInfo.address,
      total: total,
    };
  
    emailjs.send("your_service_id", "your_template_id", templateParams, "your_public_key")
      .then(response => {
        console.log("Email sent!", response.status, response.text);
      })
      .catch(error => {
        console.error("Email send error:", error);
      });
  };
  

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Receipt", 20, 20);
    doc.text(`Name: ${userInfo.name}`, 20, 30);
    doc.text(`Email: ${userInfo.email}`, 20, 40);
    doc.text(`Address: ${userInfo.address}`, 20, 50);
    autoTable(doc, {
      startY: 60,
      head: [["Product", "Price", "Quantity", "Total"]],
      body: cartItems.map(item => [item.name, `$${item.price}`, item.quantity, `$${(item.price * item.quantity).toFixed(2)}`]),
    });
    doc.text(`Total: $${total}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save("receipt.pdf");
  };

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
          <Button text={"Proceed To Checkout"} onClick={() => setIsModalOpen(true)} width={"100%"} height={"40px"} />
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Enter Your Details</h2>
            <input type="text" placeholder="Name" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} />
            <input type="email" placeholder="Email" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
            <input type="text" placeholder="Address" value={userInfo.address} onChange={e => setUserInfo({...userInfo, address: e.target.value})} />
            <Button text={"Generate PDF"} height={"30px"} onClick={() => { generatePDF(); setIsModalOpen(false); }} />
            <Button text={"Cancel"} height={"30px"} onClick={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="container"><div className={styles.cartContent}>Your cart is empty</div></div>
  );
};

export default ShoppingCart;