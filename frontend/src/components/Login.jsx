import React, { useState } from "react";
import axios from "axios";

const UserAuth = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({ userName: "", EmailId: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        EmailId: formData.EmailId,
        password: formData.password,
      });
      alert("Login successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        userName: formData.userName,
        EmailId: formData.EmailId,
        password: formData.password,
      });
      alert("Signup successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Our Store</h2>
      <button onClick={() => setShowLogin(true)} style={buttonStyle}>
        Login
      </button>
      <button onClick={() => setShowSignup(true)} style={{ ...buttonStyle, backgroundColor: "#007BFF" }}>
        Signup
      </button>

      {/* Login Modal */}
      {showLogin && (
        <div style={modalStyle}>
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="EmailId"
              placeholder="Email"
              value={formData.EmailId}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <button type="submit" style={{ ...buttonStyle, margin: "10px 0" }}>
              Submit
            </button>
            <button onClick={() => setShowLogin(false)} style={{ ...buttonStyle, backgroundColor: "#FF0000" }}>
              Close
            </button>
          </form>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div style={modalStyle}>
          <h3>Signup</h3>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="email"
              name="EmailId"
              placeholder="Email"
              value={formData.EmailId}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <button type="submit" style={{ ...buttonStyle, margin: "10px 0" }}>
              Submit
            </button>
            <button onClick={() => setShowSignup(false)} style={{ ...buttonStyle, backgroundColor: "#FF0000" }}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: "1000",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default UserAuth;
