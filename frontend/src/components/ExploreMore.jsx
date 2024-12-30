import React, { useContext, useEffect, useState, useRef } from 'react';
// import styles from './Header.module.css';
import styles from './ExploreMore.module.css'
import UserContext from '../Context/userContext.jsx';
import axios from 'axios';
import Footer from './Footer.jsx';
import './Products.css';
import { useNavigate } from 'react-router-dom';

import cartIcon from '../assets/cart.png'; // Adjust the path as needed
const ExploreMore = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:3000/ExploreContent');
            if (res.status == 201) {
                console.log(res.data.docs, "1111111111");
                setProducts([...res.data.docs]);
            }
        })()
    }, [])
    return (
        <div>
            <Navbar />
            <Products products={products} />
        </div>
    )
}

const Products = ({ products }) => {
    const { setBuyingPrdt, BuyingPrdt } = useContext(UserContext);
    const navigate = useNavigate();
    // Function to get a random description
    const getRandomDescription = () => {
        const randomDescriptions = [
            'This is an amazing product.',
            'You will love this product!',
            'An essential item for your collection.',
            'Top quality product you can rely on.',
            'Your new favorite product awaits!',
        ];
        return randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
    };

    // Function to get a random image
    const getRandomImage = () => {
        const randomImages = [
            'https://via.placeholder.com/300x200?text=Product+Image+1',
            'https://via.placeholder.com/300x200?text=Product+Image+2',
            'https://via.placeholder.com/300x200?text=Product+Image+3',
            'https://via.placeholder.com/300x200?text=Product+Image+4',
        ];
        return randomImages[Math.floor(Math.random() * randomImages.length)];
    };
    // Function to get a random price
    const getRandomPrice = () => {
        return (Math.random() * (100 - 10) + 10).toFixed(2); // Random price between $10 and $100
    };

    // Function to handle Buy Now button click
    const handleBuyNow = (product) => {
        console.log("buyong")

    };

    const AddCart = async (product) => {
        try {
            const Token = document.cookie.split("=")[1];
            console.log("tttttttttttttttoken", Token)
            const res = await axios.post('http://localhost:3000/AddCart', { product }, {
                headers: {
                    Authorization: `Bearer ${Token}` // Using Authorization header
                }
            });

            if (res.status == 201) {
                alert("product added to cart");
            } else {
                alert("login first");
            }
        } catch (error) {
            console.log("error in saving product to cart, ", error);
        }
    }
    return (
        <div className="products-container">
            {products.map((product, index) => (
                <div className="product-card" key={product.id}>
                    <img
                        style={{
                            height: '200px',
                            width: '200px',
                            borderRadius: '8px',
                        }}
                        src={product.img || getRandomImage()}
                        alt={product.Name || 'Random Product'}
                    />
                    <div className="product-info">
                        <h3 className="product-name">{product.Name || 'Random Product'}</h3>
                        <p className="product-description">{product.description || getRandomDescription()}</p>
                        <div className="product-price-btn">
                            <p className="product-price">{product.price || getRandomPrice()}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => AddCart(product)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="buy-now-btn"
                                onClick={() => {
                                    setBuyingPrdt(product); // Wrap in an array if you expect a list
                                    navigate('/buyNow');
                                }}

                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};



const Navbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
    const [isSignUp, setIsSignUp] = useState(false); // Track if the user wants to sign up
    const { isLogged, setLog } = useContext(UserContext);
    const [data, setData] = useState();
    const [Login, setLogin] = useState();
    const navigate = useNavigate()
    const dropdownRef = useRef(null); // Ref for the dropdown

    const [isProfile, setProfile] = useState(false); // State to track profile modal visibility
    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        console.log(isLogged);
        const Token = document.cookie.split('=')[1];
        if (document.cookie.length !== 0) {
            setLog(true);
        } else setLog(false)
    }, []);

    const sendData = async () => {
        try {
            const res = await axios.post('http://localhost:3000/signup', data);
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
            const res = await axios.post('http://localhost:3000/login', Login);
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
    useEffect(() => {
        console.log(isLogged);
        const Token = document.cookie.split('=')[1];
        if (document.cookie.length !== 0) {
            setLog(true);
        }

        // Fetch user profile data if logged in (assuming an API endpoint to get user details)
        if (isLogged) {
            axios.get('http://localhost:3000/user/profile', {
                headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
            })
                .then((response) => setUserProfile(response.data))
                .catch((error) => console.log('Error fetching profile:', error));
        }
    }, [isLogged]);
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>BraceletLand</div>

                <div className={styles.actions}>
                    {/* User Profile Section */}
                    <nav className={styles.nav}>
                        <a onClick={() => navigate('/')}>Home</a>
                    </nav>
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
                                        <a onClick={openProfileModal}>Profile</a>
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


                    <button
                        onClick={() => {
                            if (isLogged) navigate('/cart')
                            else {
                                setIsSignUp(false); // Set to false for login form
                                setModalVisible(true);
                            }
                        }}
                        style={{
                            backgroundColor: '#f69605',  /* Set a bright color for the background */
                            color: 'white',               /* White text color */
                            border: 'none',               /* Remove default border */
                            padding: '12px 25px',         /* Provide padding for top, bottom, left, and right */
                            fontSize: '0.9rem',           /* Slightly larger font size */
                            borderRadius: '8px',          /* Rounded corners */
                            cursor: 'pointer',           /* Change cursor to a pointer on hover */
                            textTransform: 'uppercase',   /* Uppercase text */
                            fontWeight: 'bold',           /* Bold font for emphasis */
                            transition: 'all 0.3s ease-in-out',  /* Smooth transition for hover effects */
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  /* Subtle shadow for depth */
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e58c47'; /* Darker shade on hover */
                            e.target.style.transform = 'translateY(-3px)'; /* Slight lift effect on hover */
                            e.target.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.15)'; /* Deeper shadow on hover */
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#f69605'; /* Original background color */
                            e.target.style.transform = 'translateY(0)'; /* Reset the lift effect */
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; /* Reset shadow */
                        }}
                        onFocus={(e) => {
                            e.target.style.boxShadow = '0px 0px 5px 2px rgba(255, 153, 51, 0.7)'; /* Custom focus outline */
                        }}
                        onBlur={(e) => {
                            e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; /* Reset shadow when focus is lost */
                        }}
                    >
                        Cart
                    </button>

                </div>

                {/* Modal for Login or Sign Up */}
                {isModalVisible && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                X
                            </button>

                            {/* Profile Modal Content */}
                            {isProfile && isLogged ? (
                                <div className={styles.profileContent}>
                                    {/* Profile Image and Name */}
                                    <div style={{
                                        marginLeft: '50px'
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
        </div>
    )
}
export default ExploreMore;
export { Navbar }