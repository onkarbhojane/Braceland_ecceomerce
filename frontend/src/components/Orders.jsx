import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import { Navbar } from './ExploreMore';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const Token = document.cookie.split("=")[1]; // Assuming the token is stored in cookies
                console.log("Token:", Token);

                const res = await axios.get(
                    'http://localhost:3000/getOrders', 
                    {
                        headers: {
                            Authorization: `Bearer ${Token}`,  // Using Authorization header
                        }
                    }
                );

                console.log(res.data, "Orders fetched successfully");

                if (res.status === 201) {  // 200 OK for successful fetch
                    setOrders(res.data);  // Set the fetched orders
                } else {
                    alert("Login first");
                }
            } catch (error) {
                console.log("Error in fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);  // Only runs once when component is mounted

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    const cancelOrder = async (orderId) => {
        try {
            const Token = document.cookie.split("=")[1]; // Get the token from cookies
            const res = await axios.post(
                `http://localhost:3000/cancelOrder/${orderId}`, 
                {}, // You can pass any required data here
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,  // Using Authorization header
                    }
                }
            );

            if (res.status === 200) {
                alert('Order canceled successfully');
                setOrders(orders.filter(order => order._id !== orderId));  // Remove canceled order from the list
            } else {
                alert('Failed to cancel order');
            }
        } catch (error) {
            console.log("Error in canceling order:", error);
            alert('Error in canceling order');
        }
    };

    return (
        <>
            <Navbar />
            <section className={styles.orders}>
                <div className={styles.orderList}>
                    {orders.length === 0 ? (
                        <p className={styles.noOrders}>Nothing ordered yet</p>  // Show message if no orders exist
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order._id}  // Using the correct unique ID
                                className={styles.orderRow}
                                onClick={() => openModal(order)}  // Open modal on row click
                            >
                                {/* Assuming order.Product contains an image or use a default image */}
                                <img className={styles.orderImage} 
                                     src={order.Product[0]?.img || 'default-image-url.jpg'} 
                                     alt="Order" 
                                />
                                <div className={styles.orderDetails}>
                                    <h3>{order.Product[0]?.Name || 'Product Name'}</h3>  {/* Display product name */}
                                    <p>{order.Address}</p>  {/* Display address */}
                                    <p><strong>Payment Method:</strong> {order.PaymentMethod}</p>
                                </div>
                                <button 
                                    className={styles.cancelButton}
                                    onClick={(e) => {
                                        e.stopPropagation();  // Prevent modal from opening when cancel is clicked
                                        cancelOrder(order._id);  // Cancel the order
                                    }}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && selectedOrder && (
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
                                src={selectedOrder.Product[0]?.img || 'default-image-url.jpg'}
                                alt="Order"
                            />
                            <h3>{selectedOrder.Product[0]?.Name || 'Product Name'}</h3>
                            <p><strong>Address:</strong> {selectedOrder.Address}</p>
                            <p><strong>Payment Method:</strong> {selectedOrder.PaymentMethod}</p>
                            <p><strong>Details:</strong> {selectedOrder.Product[0]?.FullName || 'No extra details available'}</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Orders;
