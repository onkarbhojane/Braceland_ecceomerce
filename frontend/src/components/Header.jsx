import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './Header.module.css';
import UserContext from '../Context/userContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // Modal for profile
  const [isSignUp, setIsSignUp] = useState(false); // Track if the user wants to sign up
  const { isLogged, setLog } = useContext(UserContext);
  const [data, setData] = useState();
  const [Login, setLogin] = useState();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown
  const [isProfile, setProfile] = useState(false); // State to track profile modal visibility
  const [userProfile, setUserProfile] = useState({}); // User profile data

  useEffect(() => {
    console.log(isLogged);
    const Token = document.cookie.split('=')[1];
    if (document.cookie.length !== 0) {
      setLog(true);
    }

    // Fetch user profile data if logged in (assuming an API endpoint to get user details)
    if (isLogged) {
      axios.get('https://braceland-eccomerce-backend.onrender.com/user/profile', {
        headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
      })
        .then((response) => setUserProfile(response.data))
        .catch((error) => console.log('Error fetching profile:', error));
    }
  }, [isLogged]);

  const sendData = async () => {
    try {
      const res = await axios.post('https://braceland-eccomerce-backend.onrender.com/signup', data);
      if (res.status === 201) {
        document.cookie = 'Token=' + res.data.Token;
        setLog(true);
        setModalVisible(false);
      }
    } catch (error) {
      console.log('error in signup ', error);
    }
  };

  const sendLogin = async () => {
    try {
      const res = await axios.post('https://braceland-eccomerce-backend.onrender.com/login', Login);
      if (res.status === 201) {
        document.cookie = 'Token=' + res.data.Token;
        setLog(true);
        setModalVisible(false);
      }
    } catch (error) {
      console.log('error in login process,  ', error);
    }
  };

  const handleLoginClick = () => {
    setIsSignUp(false); // Set to false for login form
    setModalVisible(true); // Show the login modal
  };

  const handleSignUpClick = () => {
    setIsSignUp(true); // Set to true for signup form
    setModalVisible(true); // Show the signup modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  const openProfileModal = () => {
    setProfile(true); // Open the profile modal
    setModalVisible(true); // Show the modal
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>BraceletLand</div>

      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="#about">About Us</a>
        <a href="#products">Products</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact Us</a>
      </nav>

      <div className={styles.actions}>
        {/* User Profile Section */}
        <div
          className={styles.userProfile}
          onClick={() => setDropdownVisible(!isDropdownVisible)}
          ref={dropdownRef}
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="User Icon"
            className={styles.userIcon}
          />
          <span className={styles.userName}>User</span>
          {isDropdownVisible && (
            <div className={styles.dropdown}>
              {isLogged ? (
                <>
                  <a onClick={openProfileModal}>Profile</a> {/* Open profile modal */}
                  <a href="/Orders">Orders</a>
                  <a
                    onClick={() => {
                      document.cookie =
                        'Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                      setLog(false);
                    }}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <a href="#login" onClick={handleLoginClick}>
                  Login ?
                </a>
              )}
            </div>
          )}
        </div>

        <button className={styles.cta} onClick={() => navigate('/Explore')}>Shop Now</button>
      </div>

      {/* Modal for Login, Sign Up, or Profile */}
      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              X
            </button>

            {/* Profile Modal Content */}
            {isProfile ? (
              <div className={styles.profileContent}>
                {/* Profile Image and Name */}
                <div style={{
                  marginLeft:'50px'
                }}>
                  <img
                    src={userProfile.img || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <div className={styles.profileName}>
                    {userProfile.userName || `John Doe ${Math.floor(Math.random() * 1000)}`}
                  </div>
                </div>

                {/* Profile Details Cards in Horizontal Layout */}
                <div className={styles.profileDetails}>
                  {/* Address Card */}
                  <div className={styles.card}>
                    <h3>Address</h3>
                    <p>{userProfile.address || "123 Main St, City, Country"}</p>
                  </div>

                  {/* Email Card */}
                  <div className={styles.card}>
                    <h3>Email</h3>
                    <p>{userProfile.EmailId || "johndoe@example.com"}</p>
                  </div>

                  {/* Mobile Number Card */}
                  <div className={styles.card}>
                    <h3>Mobile Number</h3>
                    <p>{userProfile.mobileNumber || "+1 234 567 890"}</p>
                  </div>
                </div>
              </div>
            ) : (

              <>
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

                {/* Login Form */}
                {!isSignUp ? (
                  <form>
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        onChange={(event) =>
                          setLogin({ ...Login, Email: event.target.value })
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input
                        type="password"
                        onChange={(event) =>
                          setLogin({ ...Login, password: event.target.value })
                        }
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" onClick={sendLogin}>
                        Login
                      </button>
                    </div>
                  </form>
                ) : (
                  // Sign Up Form
                  <form>
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        onChange={(event) =>
                          setData({ ...data, Email: event.target.value })
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label>Username:</label>
                      <input
                        type="text"
                        onChange={(event) =>
                          setData({ ...data, Name: event.target.value })
                        }
                        placeholder="Choose a username"
                        required
                      />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input
                        type="password"
                        onChange={(event) =>
                          setData({ ...data, password: event.target.value })
                        }
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button type="submit" onClick={sendData}>
                        Sign Up
                      </button>
                    </div>
                  </form>
                )}

                {/* Switch between Login and Sign Up */}
                {!isSignUp ? (
                  <div className={styles.switchLink}>
                    <p>
                      Don't have an account?{' '}
                      <a href="#signup" onClick={handleSignUpClick}>
                        Sign Up
                      </a>
                    </p>
                  </div>
                ) : (
                  <div className={styles.switchLink}>
                    <p>
                      Already have an account?{' '}
                      <a href="#login" onClick={handleLoginClick}>
                        Login
                      </a>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
