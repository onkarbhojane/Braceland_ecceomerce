import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const [images,setImages]=useState([]);
  const navigate=useNavigate();
  const [currentImage, setCurrentImage] = useState(images[0]); // Default image
  useEffect(()=>{
    (async()=>{
      try{
        const res=await axios.get('https://braceland-eccomerce-backend.onrender.com/Story');
        if(res.status==201){
          setImages([...res.data.images]);
          console.log("IIIIIIIIIIIIIIIIIII",images);
        }
      }catch(error){
        console.log("error in fetching Image Data, ",error);
      }
    })()
  },[])
  useEffect(() => {
    const interval = setInterval(() => {
      // Change the background image every 5 seconds
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images]);

  return (
    <section
      className={styles.hero}
      id="home"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 1s ease-in-out', // Smooth transition
      }}
    >
      <div className={styles.content}>
        <h1
          style={{
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Add shadow for better readability
          }}
        >
          Elegant Bracelets for Every Occasion
        </h1>
        <p
          style={{
            color: '#fff',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)', // Add shadow for better readability
          }}
        >
          Discover the perfect bracelet that complements your style. Handcrafted with love and precision.
        </p>
        <button className={styles.cta} onClick={()=> navigate('/Explore')}>Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;
