import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <h2>Our Story</h2>
      <p>
        BraceletLand brings elegance to your wrist with handcrafted designs. 
        Each piece tells a story of craftsmanship and passion.
      </p>
      <p>
        Established in 2023, BraceletLand was born out of a desire to blend 
        tradition and modernity. Our artisans meticulously design each bracelet 
        to capture the essence of timeless beauty.
      </p>
      <p>
        We are committed to sustainability and ethical sourcing. Every material 
        used in our designs is carefully chosen to minimize environmental impact, 
        ensuring that you wear not just a bracelet, but a symbol of care for the planet.
      </p>
      <p>
        Join us on this journey as we celebrate individuality and style through 
        our exclusive collections. Whether it’s a gift for a loved one or a personal 
        statement, BraceletLand is here to make your moments memorable.
      </p>
    </section>
  );
};

export default About;
