
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Order.css";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.128.90:3000/get/order_details/117`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data.Message);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const handleAccept = (orderId, index) => {

        const updatedOrders = [...orders];
        updatedOrders[index].Status = 'Accepted';
        setOrders(updatedOrders);


        updateOrderStatus(orderId, 'accept');
    };

    const handleReject = (orderId, index) => {

        const updatedOrders = [...orders];
        updatedOrders[index].Status = 'Rejected';
        setOrders(updatedOrders);
        updateOrderStatus(orderId, 'reject');
    };

    const fetchOrders = () => {
        setLoading(true);
        axios.get(`http://192.168.128.90:3000/get/order_details/61`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data.Message);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to update order status
    const updateOrderStatus = (orderId, action) => {
        fetch('http://localhost:3000/accept_or_reject_order', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: action,
                id: orderId
            })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Response:', data); // Log the response data
                // Fetch updated data after update
                fetchOrders();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='order-body'>
            <div >
                <Sidebar />
            </div>
            <h1>Order List</h1>
            <ul>
                {orders && orders.length > 0 ? (
                    <table className="ordertable">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Amount</th>
                                <th>Time</th>
                                <th>Number of product</th>
                                <th>Customer Id</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table1">
                            {orders.map((ord, index) => (
                                <tr key={ord.ID}>
                                    <td><a href={`/order/${ord.ID}`}>{ord.ID}</a></td>
                                    <td><Link href={`/order/${ord.ID}`}>{ord.NetAmount}</Link></td>
                                    <td><a href={`/order/${ord.ID}`}>{ord.Time}</a></td>
                                    <td><a href={`/order/${ord.ID}`}>{ord.TypeOfProduct}</a></td>
                                    <td><a href={`/order/${ord.ID}`}>{ord.CustomerID}</a></td>
                                    <td>{ord.Status}</td>
                                    <td>
                                        <a href="#" className="accept1" onClick={() => handleAccept(ord.ID, index)} >Accept</a> &nbsp;
                                        <a href="#" className="reject1" onClick={() => handleReject(ord.ID, index)} >Reject</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders found.</p>
                )}
            </ul>
        </div>
    );
}

export default Order;
