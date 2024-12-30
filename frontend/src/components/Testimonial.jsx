import React, { useEffect, useState } from 'react';
import styles from './Testimonials.module.css';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonial] = useState([]);
  const [page, setPage] = useState(1); // State for pagination
  const [loading, setLoading] = useState(false); // State for loading status

  // Function to fetch testimonials
  const fetchTestimonials = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://braceland-eccomerce-backend.onrender.com/testimonials?page=${pageNum}`);
      if (res.status === 201) {
        setTestimonial((prev) => [...prev, ...res.data.docs]);
        console.log(res.data.docs, " fetched testimonials");
      }
    } catch (error) {
      console.log('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(page); // Fetch testimonials when component mounts or when page changes
  }, [page]);

  return (
    <section className={styles.testimonials} id="testimonials">
      <h2>What Our Customers Say</h2>
      <div className={styles.carousel}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.card}>
            <p>"{t.Message}"</p>
            <strong>- {t.Name}</strong>
          </div>
        ))}
      </div>
      {/* Load More button */}
      <div className={styles.loadMoreButton}>
        {!loading && (
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className={styles.button}
          >
            Load More Reviews
          </button>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </section>
  );
};

export default Testimonials;
