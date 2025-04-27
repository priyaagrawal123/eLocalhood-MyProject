import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './Updatedelete.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Updatedelete = () => {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState("");
    const [product, setProduct] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)

    const navigate = useNavigate("")
    const handleClick = () => {
        // setSubmitClicked(true);
        navigate("/productdetails");
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.128.90:3000/get/product_details`)
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

    const handleDelete = async (id, index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            customClass: {
                popup: 'custom-swal'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://192.168.128.90:3000/Product_Details_Delete/${id}`) // Include the correct endpoint with the product ID
                    .then(() => {
                        setProductDetails(prevProducts => prevProducts.filter(product => product.ID !== id));
                        Swal.fire('Success', 'Product deleted successfully!', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        Swal.fire('Error', 'Failed to delete product!', 'error');
                    });
            }
        });
    };

    const handleUpdate = (index) => {
        const productToUpdate = productDetails[index];
        if (!productToUpdate) {
            console.error("Product details not found!");
            return;
        }

        Swal.fire({
            title: 'Update Product',
            html:
                `<input id="swal-input1" class="swal2-input" value="${productToUpdate.Name}" placeholder="Name">` +
                `<input id="swal-input2" class="swal2-input" value="${productToUpdate.Description}" placeholder="Description">` +
                `<input id="swal-input3" class="swal2-input" value="${productToUpdate.Price}" placeholder="Price">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const description = document.getElementById('swal-input2').value;
                const price = document.getElementById('swal-input3').value;

                // Construct updated product object
                const updatedProduct = {
                    Name: name,
                    Description: description,
                    Price: parseFloat(price) // Ensure price is parsed to a float
                };

                // Send PUT request to update product
                axios.put(`http://192.168.128.90:3000/Update_Product_Details`, updatedProduct)
                    .then(response => {
                        // If update successful, update product details in state
                        const updatedProductDetails = [...productDetails];
                        updatedProductDetails[index] = response.data; // Assuming backend returns updated product data
                        setProductDetails(updatedProductDetails);
                        Swal.fire('Success', 'Product updated successfully!', 'success');
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                        Swal.fire('Error', 'Failed to update product!', 'error');
                    });
            },
            customClass: {
                popup: 'custom-swal update-swal' // Apply custom class to the dialog
            }
        });
    };


    return (
        <div className='update-body'>
            <Sidebar />
            {loading ? (
                <p>Loading...</p>
            ) : productDetails.length > 0 ? (
                <div className='du'>
                    <h1>My productList </h1>
                    <table className="producttable" border={1}>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((product, index) => (
                                <tr key={index}>

                                    <td>{product.ID}</td>
                                    <td>{product.Name}</td>
                                    <td>{product.Description}</td>
                                    <td>${product.Price}</td>
                                    <td>
                                        <a href="#" onClick={() => handleDelete(product.ID, index)} className='delete'>Delete</a> &nbsp;
                                        <a href="#" onClick={() => handleUpdate(index)} className='update' >Update</a> &nbsp;
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='button' onClick={handleClick} required >Add New Product</button>
                </div>
            ) : (
                <p>No product details found.</p>
            )}
        </div>
    );
}

export default Updatedelete;
