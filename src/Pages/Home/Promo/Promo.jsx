import React from 'react'
import styles from './Promo.module.css'
import plant from '../../../images/banner.png'
import Button from '../../../components/UI/Button'

const Promo = () => {
  return (
    <div className="container">
        <div className={styles.promoBanners}>
        <div className={styles.promoBanner}>
          <img src={plant} alt="Summer Cactus & Succulents" />
         <div className={styles.promoText}>
         <h3>SUMMER CACTUS & SUCCULENTS</h3>
          <p>We are an online plant shop offering a wide range of cheap and trendy plants</p>
          <Button text={"Find More ->"} width={"140px"} height={"40px"}  />
         </div>
        </div>
        <div className={styles.promoBanner}>
          <img src={plant} alt="Summer Cactus & Succulents" />
         <div className={styles.promoText}>
         <h3>SUMMER CACTUS & SUCCULENTS</h3>
          <p>We are an online plant shop offering a wide range of cheap and trendy plants</p>
          <Button text={"Find More ->"} width={"140px"} height={"40px"}  />
         </div>
        </div>
      </div>
    </div>
  )
}

export default Promo