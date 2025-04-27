import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import "./Details.css";

const Details = () => {
    const [details, setDetails] = useState([]); // Initialize state as an empty array
    const [loading, setLoading] = useState(true);
    const ID = 8; // Insert the ID you want to fetch data for

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.128.15:3003/order/${ID}`)
            .then(response => {
                console.log(response.data);
                setDetails(response.data);
                setLoading(false);
                console.log("=>>>" + details.orderId);

                ;
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });
    }, [ID]);

    return (
        <div className='order-details'>
            <div >
                <Sidebar />
            </div>
            <h2 className='details'>Product Details</h2>


            <div className='orderdetails'>
                {
                    <div>
                        <div className='Pd-Box'>
                            <p className='p1-details'>Order ID: {details.orderId}</p>
                            <p className='p2-details'>Product ID: {details.sellerId}</p>

                            <p className='p3-details'>Delivery status: {details.status}</p>
                            <p className='p4_details'>Time: {details.time}</p>
                            <p className='p5-details'>Price: {details.price}</p>
                            <p className='p6-details'>Number of products: {details.typeOfProduct}</p>
                        </div>
                    </div>
                }
            </div>


        </div >
    );
}

export default Details;
