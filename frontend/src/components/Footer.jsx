import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 BraceletLand. All Rights Reserved.</p>

        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>

        <div className={styles.footerInfo}>
          <p>
            <strong>Contact Us:</strong>
          </p>
          <p>Phone: +1 (234) 567-890</p>
          <p>Email: contact@BraceletLand.com</p>
        </div>

        <div className={styles.footerAddress}>
          <p>
            <strong>Our Address:</strong>
          </p>
          <p>123 Bracelet Street, Jewelry Town, AB 12345, USA</p>
        </div>

        <div className={styles.footerLinks}>
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>
          |
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
