import React from 'react'
import styles from './Footer.module.css'
import footerImg1 from '../../images/footer_1.png'
import footerImg2 from '../../images/footer_2.png'
import footerImg3 from '../../images/footer_3.png'
import facebook from '../../images/Facebook.png'
import twitter from '../../images/Twitter.png'
import linkedin from '../../images/Linkedin.png'
import union from '../../images/Union.png'
import instagram from '../../images/Instagram.png'
import payment from '../../images/payment.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
   <div className="container">
   <div className={styles.footerTop}>
     <div className={styles.footerInfo}>
     <div className={styles.footerSection}>
        <img src={footerImg1} alt="" />
        <h4>Garden Care</h4>
        <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
      </div>
      <hr />

      <div className={styles.footerSection}>
      <img src={footerImg2} alt="" />
        <h4>Plant Renovation</h4>
        <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
      </div>
      <hr />
      <div className={styles.footerSection}>
      <img src={footerImg3} alt="" />
        <h4>Watering Garden</h4>
        <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
      </div>
     </div>
      <div className={styles.newsletter}>
        <h4>Would you like to join newsletters?</h4>
        <input type="email" placeholder="Enter your email address..." />
        <button>Join</button>
      </div>
    </div>
    <div className={styles.footerBottom}>
      <div className={styles.contactInfo}>
        <span> 70 West Buckingham Ave. Farmingdale, NY 11735</span>
        <span> contact@greenshop.com</span>
        <span> +88 01911 717 490</span>
      </div>
      <div className={styles.footerLinks}>
        <div>
          <h5>My Account</h5>
          <ul>
            <li>My Account</li>
            <li>Our stores</li>
            <li>Contact us</li>
            <li>Career</li>
            <li>Specials</li>
          </ul>
        </div>
        <div>
          <h5>Help & Guide</h5>
          <ul>
            <li>Help Center</li>
            <li>How to Buy</li>
            <li>Shipping & Delivery</li>
            <li>Product Policy</li>
            <li>How to Return</li>
          </ul>
        </div>
        <div>
          <h5>Categories</h5>
          <ul>
            <li>House Plants</li>
            <li>Potter Plants</li>
            <li>Seeds</li>
            <li>Small Plants</li>
            <li>Accessories</li>
          </ul>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <h5>Social Media</h5>
        <div className={styles.socialIcons}>
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={linkedin} alt="" />
          <img src={union} alt="" />
          <img src={instagram} alt="" />
        </div>
      </div>
      <div className={styles.payments}>
        <h5>We accept</h5>
        <img src={payment} alt="" />
      </div>
    </div>
   </div>
  </footer>
  )
}

export default Footer