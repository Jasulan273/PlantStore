import React from 'react'
import styles from './Banner.module.css'
import Button from '../../../components/UI/Button'
import BannerImg from '../../../images/banner.png'


const Banner = () => {
  return (
    <div className="container">
        <div className={styles.banner}>
         <div className={styles.bannerText}>
           <h4>WELCOME TO GREENSHOP</h4>
           <p className={styles.headerText}>Let’s Make a
           Better <span style={{color:'var(--main-green-color)'}}>Planet</span></p>
           <h4 style={{fontWeight:'400',color:'#727272',marginBottom:'12px'}}>We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</h4>
           <Button width={"140px"} height={"37px"} text={"SHOP NOW"}/>
         </div>
         <img src={BannerImg} alt="" />
        </div>
    </div>
  )
}

export default Banner