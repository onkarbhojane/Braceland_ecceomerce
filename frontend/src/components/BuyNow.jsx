import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API requests
import styles from './Buy.module.css'; // Import CSS Module
import { Navbar } from './ExploreMore'; // Ensure Navbar is imported correctly

const BuyNowPage = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const { isLogged, BuyingPrdt, setBuyingPrdt, setLog } = useContext(UserContext);

    const [data, setData] = useState();
    const [Login, setLogin] = useState();
    const [addressDetails, setAddressDetails] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [product, setProduct] = useState([]); // To store product data
    const navigate = useNavigate();
    useEffect(() => {
        console.log(isLogged);
        const Token = document.cookie.split('=')[1];
        if (document.cookie.length !== 0) {
            setLog(true);
        }
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
    const handleLoginClick = () => {
        setIsSignUp(false); // Set to false for login form
        setModalVisible(true); // Show the login modal
    };

    const handleSignUpClick = () => {
        setIsSignUp(true); // Set to true for signup form
        setModalVisible(true); // Show the signup modal
    };
    const sendLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/login', Login);
            if (res.status === 201) {
                console.log(res.data.Token);
                document.cookie = 'Token=' + res.data.Token;
                setLog(true);
                setModalVisible(false);
            }
        } catch (error) {
            console.log('error in login process,  ', error);
        }
    };
    // Fetch product data on page load
    useEffect(() => {
        setProduct([...BuyingPrdt]);
        console.log("dddddddddffffffffffffff", product);
    }, []);

    if (!BuyingPrdt || !product) {
        return (
            <div className={styles.noProduct}>
                <p>No product selected. Please select a product first.</p>
            </div>
        );
    }

    const handleLoginSignup = () => {
        setModalVisible(true)
        // navigate('/login');
    };

    const handlePlaceOrder = async () => {
        if (!isLogged) {
            handleLoginSignup();
            return;
        }

        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        const completeAddress = `${addressDetails.street}, ${addressDetails.city}, ${addressDetails.state}, ${addressDetails.zipCode}`;

        console.log({
            product: BuyingPrdt,
            address: completeAddress,
            paymentMethod,
        });
        try {
            const Token = document.cookie.split("=")[1];
            console.log("tttttttttttttttoken", Token);

            // Ensure token exists before proceeding
            if (!Token) {
                alert("Please login first");
                return;
            }
            console.log("Buying prdt, ", product)
            const res = await axios.post('http://localhost:3000/Order',
                { product, paymentMethod, addressDetails },
                {
                    headers: {
                        Authorization: `Bearer ${Token}` // Using Authorization header
                    }
                }
            );
            console.log(res.data)
            if (res.status === 201) {
                alert(`Order placed successfully using ${paymentMethod}!`);
                navigate('/buyNow/Confirm'); // Redirect to success page
            } else {
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.log("Error in placing order: ", error);
            alert("An error occurred while placing the order. Please try again.");
        }

    };
    const closeModal = () => {
        setModalVisible(false); // Close the modal
    };
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Check if all fields are filled
    const isFormValid = addressDetails.street && addressDetails.city && addressDetails.state && addressDetails.zipCode && paymentMethod;

    return (
        <div>
            <Navbar />
            <div className={styles.buyNowPage}>
                <h1>Buy Now</h1>
                <div className={styles.productContainer}>
                    {product.map((prdt, index) => (
                        <div className={styles.productCard} key={index}>
                            <h2 className={styles.productName}>Product: {prdt.Name}</h2>
                            <img
                                src={prdt.img || 'https://via.placeholder.com/300x200'} // Use actual product image
                                alt={prdt.Name}
                                className={styles.productImage}
                            />
                            <p className={styles.productPrice}>Price: ${prdt.price}</p>
                        </div>
                    ))}
                </div>



                {!isLogged ? (
                    <div className={styles.loginPrompt}>
                        <p>Please log in or sign up to continue.</p>
                        <button onClick={handleLoginSignup} className={styles.loginBtn}>
                            Login/Sign Up
                        </button>
                    </div>
                ) : (
                    <div className={styles.orderForm}>
                        <div className={styles.addressSection}>
                            <h3>Enter Address</h3>
                            <input
                                type="text"
                                name="street"
                                value={addressDetails.street}
                                onChange={handleAddressChange}
                                placeholder="Street Address"
                                className={styles.addressInput}
                            />
                            <input
                                type="text"
                                name="city"
                                value={addressDetails.city}
                                onChange={handleAddressChange}
                                placeholder="City"
                                className={styles.addressInput}
                            />
                            <input
                                type="text"
                                name="state"
                                value={addressDetails.state}
                                onChange={handleAddressChange}
                                placeholder="State"
                                className={styles.addressInput}
                            />
                            <input
                                type="text"
                                name="zipCode"
                                value={addressDetails.zipCode}
                                onChange={handleAddressChange}
                                placeholder="Zip Code"
                                className={styles.addressInput}
                            />
                        </div>
                        <div className={styles.paymentSection}>
                            <h3>Select Payment Method</h3>
                            <div className={styles.paymentButtons}>
                                <button
                                    onClick={() => setPaymentMethod('UPI')}
                                    className={`${styles.paymentBtn} ${paymentMethod === 'UPI' ? styles.active : ''}`}
                                >
                                    UPI
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('Cash')}
                                    className={`${styles.paymentBtn} ${paymentMethod === 'Cash' ? styles.active : ''}`}
                                >
                                    Cash
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('GPay')}
                                    className={`${styles.paymentBtn} ${paymentMethod === 'GPay' ? styles.active : ''}`}
                                >
                                    GPay
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className={`${styles.placeOrderBtn} ${!isFormValid ? styles.disabled : ''}`}
                            disabled={!isFormValid} // Disable if form is invalid
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
            {
                isModalVisible && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                X
                            </button>
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
                                    <button type="submit" onClick={sendLogin}>
                                        Login
                                    </button>
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
                                    <button type="submit" onClick={sendData}>
                                        Sign Up
                                    </button>
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
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BuyNowPage;