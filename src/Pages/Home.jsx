import React from 'react'
import Banner from './Home/Banner/Banner'
import Shop from './Home/Shop/Shop'
import Promo from './Home/Promo/Promo'
import Blog from './Home/Blog/Blog'

const Home = () => {
  return (
       <div>
         <Banner />
         <Shop />
         <Promo />
         <Blog />
       </div>
  )
}

export default Home