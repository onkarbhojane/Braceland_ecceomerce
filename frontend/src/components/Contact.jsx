import React, { useState } from 'react';
import styles from './Contact.module.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const sendM = async () => {
    try {
      console.log('Form data:', formData);
      const res = await axios.post('http://localhost:3000/Queries', formData);
      if (res.status === 201) {
        setIsSubmitted(true);
        console.log('Form Data Submitted:', formData);
      }
    } catch (error) {
      console.log('Error in sending contact us details:', error);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <h2>Contact Us</h2>
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        ></textarea>
        <button type="button" onClick={sendM}>Send Message</button>
      </div>
      {isSubmitted && <p className={styles.successMessage}>Your message has been sent! We will contact you soon!</p>}
    </section>
  );
};

export default Contact;
