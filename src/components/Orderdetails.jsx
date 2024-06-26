import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Orderdetails.css";
import Sidebar from "./Sidebar";

const Orderdetails = () => {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        axios.get(`http://192.168.128.90:3000/get/product_details/11`)
            .then(response => {
                console.log(response.data);
                setProductDetails(response.data.Message);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, []);

    const handleAccept = (orderId, index) => {

        axios.put(`http://192.168.128.90:3000/accept_or_reject_order`, { orderId })
            .then(response => {
                console.log('Order accepted:', response.data.Message);

            })
            .catch(error => {
                console.error('Error accepting order:', error);
            });
    };



    const handleReject = (orderId, index) => {

        axios.put(`http://192.168.128.90:3000/accept_or_reject_order`, { orderId })
            .then(response => {
                console.log('Order accepted:', response.data);

            })
            .catch(error => {
                console.error('Error accepting order:', error);
            });
    };

    return (

        <div className='order'>
            <div >
                <Sidebar />
            </div>
            <h2 className='header5'>Product Details</h2>

            {loading ? (
                <p>Loading...</p>
            ) : productDetails.length > 0 ? (
                <div className='orderdetails'>

                    {productDetails.map((product, index) => (
                        <div key={product.ID}>
                            <div className='Pd-Box'>

                                <p className='p1-Product'>Product ID: {product.ProductID}</p>
                                <p className='p2-Name'>Name: {product.ProductName}</p>

                                <p className='p5-Price'>Price: {product.ProductPrice}</p>
                                <p className='p6-Price'>Price: {product.Color}</p>
                                <p className='p6'>Time: {product.OrderDescriptionTime}</p>
                                <p className='p7-Photo'>Quantity: {product.Quantity}</p>
                            </div>
                            <button className="accept" onClick={() => handleAccept()}>Accept</button>
                            <button className='reject' onClick={() => handleReject()}>Reject</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No product details found.</p>
            )}
        </div>
    );
}

export default Orderdetails;
