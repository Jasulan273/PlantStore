import React from 'react'
import styles from './Blog.module.css'
import postImg from '../../../images/post.png'

const Blog = () => {
  return (
   <div className="container">
     <div className={styles.blogSection}>
    <h2>Our Blog Posts</h2>
    <p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
    <div className={styles.blogGrid}>
      {[1, 2, 3, 4].map((post, index) => (
        <div key={index} className={styles.blogCard}>
          <img src={postImg} alt="Blog Post" />
         <div className={styles.card_text}>
         <span>September {12 + index} | Read in {2 + index} minutes</span>
          <h4>Blog Post Title</h4>
          <p>Brief description of the blog post content...</p>
          <button>Read More →</button>
         </div>
        </div>
      ))}
    </div>
  </div>
   </div>
  )
}

export default Blog