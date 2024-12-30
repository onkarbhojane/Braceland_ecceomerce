import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css'; // Assuming Cart.module.css contains the styles
import { Navbar } from './ExploreMore'; // Assuming Navbar is reusable
import axios from 'axios';
import UserContext from '../Context/userContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {setBuyingPrdt,BuyingPrdt}=useContext(UserContext);
    const navigate=useNavigate();
    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const Token = document.cookie.split("=")[1]; // Assuming the token is stored in cookies
                console.log("Token:", Token);

                const res = await axios.get(
                    'http://localhost:3000/getCart',
                    {
                        headers: {
                            Authorization: `Bearer ${Token}`,
                        }
                    }
                );

                if (res.status === 200) {  // Check for status 200 (OK)
                    setCartItems([...res.data]); // Set the fetched cart items
                    console.log("Cart items fetched successfully", cartItems);
                }
            } catch (error) {
                console.log("Error in fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);  // Only runs once when component is mounted

    const proceedToCheck=()=>{
        setBuyingPrdt(cartItems);
        navigate('/buyNow')
    }



    // Log cartItems when it changes
    useEffect(() => {
        console.log(cartItems, "Cart items updated");
    }, [cartItems]);  // This will log when cartItems state changes

    // Open the modal when clicking on a cart item
    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    // Remove item from the cart
    const removeFromCart = async (itemId) => {
        try {
            const Token = document.cookie.split("=")[1]; // Get the token from cookies
            const res = await axios.post(
                `http://localhost:3000/removeFromCart/${itemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    }
                }
            );

            if (res.status === 200) {
                alert('Item removed successfully');
                setCartItems(cartItems.filter(item => item._id !== itemId));  // Remove the item from state
            } else {
                alert('Failed to remove item');
            }
        } catch (error) {
            console.log("Error in removing item:", error);
            alert('Error in removing item');
        }
    };

    return (
        <>
            <Navbar />
            <section className={styles.cart}>
                <div className={styles.cartList}>
                    {cartItems.length === 0 ? (
                        <p className={styles.noItems}>Your cart is empty</p>  // Show message if no items exist
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item._id}
                                className={styles.cartRow}
                                onClick={() => openModal(item)}  // Open modal on row click
                            >
                                <img
                                    className={styles.cartImage}
                                    src={item.img || 'default-image-url.jpg'}  // Check if img exists, otherwise use default
                                    alt="Cart item"
                                />
                                <div className={styles.cartDetails}>
                                    <h3>{item.Name || 'Product Name'}</h3>  
                                    <p>{item.price || 'N/A'}</p> {/* Display the price or fallback to 'N/A' */}
                                </div>
                                <button
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.stopPropagation();  // Prevent modal from opening when remove is clicked
                                        removeFromCart(item._id);  // Remove item from cart
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && selectedItem && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}  // Prevent modal from closing when clicked inside
                        >
                            <button className={styles.closeButton} onClick={closeModal}>
                                &times;
                            </button>
                            <img
                                className={styles.modalImage}
                                src={selectedItem.img || 'default-image-url.jpg'} // Fixed img reference
                                alt="Cart item"
                            />
                            <h3>{selectedItem.Name || 'Product Name'}</h3>
                            <p className={styles.modalPrice}><strong>Price:</strong> {selectedItem.price || 'N/A'}</p>
                            <p><strong>Quantity:</strong> {selectedItem.Quantity}</p>
                            <p><strong>Details:</strong> {selectedItem.FullName || 'Random product description'}</p> {/* Random placeholder */}
                        </div>
                    </div>
                )}

                <div className={styles.checkoutSection} onClick={proceedToCheck}>
                    <button className={styles.checkoutButton}>Proceed to Checkout</button>
                </div>
            </section>
        </>
    );
};

export default Cart;
