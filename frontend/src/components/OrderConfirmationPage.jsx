import React from "react";
import { Link, useNavigate } from "react-router-dom";
const OrderPlaced = () => {
  const navigate=useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Order Placed Successfully! 🎉</h1>
        <p style={styles.message}>
          Thank you for your order! Your items will be shipped to your address soon.
        </p>
        <p style={styles.details}>
          You can track your order in the <Link to={'/orders'} style={{textDecoration:'none'}}><strong>Orders</strong></Link> section of your account.
        </p>
        <button style={styles.button} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  card: {
    maxWidth: "500px",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "10px",
  },
  details: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default OrderPlaced;
