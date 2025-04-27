import React, { useState, useEffect } from 'react';
import './Productdetails.css';
import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Productdetails = () => {
    const [product, setProduct] = useState({
        name: '',
        image: '',
        color: '',
        price: '',
        size: '',
        weight: '',
        category: '',
    });
    const [errors, setErrors] = useState({});
    const [submitClicked, setSubmitClicked] = useState(false);
    const [isValidImage, setIsValidImage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (submitClicked) {
            validateForm();
        }
    }, [product, submitClicked]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === 'price' ? parseFloat(value) || '' : value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!product.name.trim()) {
            newErrors.name = 'Product name is required';
            valid = false;
        } else if (!/^[a-zA-Z0-9\s]{4,10}$/.test(product.name.trim())) {
            newErrors.name = "It should be in 4-10 characters";
            valid = false;
        }

        if (!product.color.trim()) {
            newErrors.color = 'Color is required';
            valid = false;
        } else if (!/^[a-zA-Z\s]{3,15}$/.test(product.color.trim())) {
            newErrors.color = "It should be in 3-15 characters";
            valid = false;
        }

        if (!product.price) {
            newErrors.price = 'Price is required';
            valid = false;
        } else if (isNaN(product.price)) {
            newErrors.price = 'Price should be a number';
            valid = false;
        }

        if ((product.category === 'Cloths' || product.category === 'Electronics') && !product.size.trim()) {
            newErrors.size = 'Size is required';
            valid = false;
        } else if (product.category === 'Cloths' && isNaN(product.size)) {
            newErrors.size = 'Size should be a number';
            valid = false;
        }

        if (product.category === 'Bakery' && !product.weight.trim()) {
            newErrors.weight = 'Weight is required';
            valid = false;
        } else if (product.category === 'Bakery' && isNaN(product.weight)) {
            newErrors.weight = 'Weight should be a number';
            valid = false;
        }

        // if (!product.category) {
        //     newErrors.category = 'Category is required';
        //     valid = false;
        // }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitClicked(true);

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('color', product.color);
        formData.append('size', product.size);
        formData.append('category', product.category);

        if (product.image) {
            formData.append('image', product.image);
        }

        // axios.post('http://192.168.128.90:3000/api/Product_Details', formData)
        //     .then((response) => {
        //         console.log(response.data);
        //         setTimeout(() => {
        //             alert("Successfully Created Your Account");
                    navigate('/congrats');
        //         }, 300);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedTypes.includes(selectedImage.type)) {
                const maxSize = 1 * 1024 * 1024; // 1MB
                if (selectedImage.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setProduct(prevProduct => ({
                            ...prevProduct,
                            image: selectedImage
                        }));
                        setImagePreview(reader.result);
                        setIsValidImage(true);
                        setErrorMessage('');
                    };
                    reader.readAsDataURL(selectedImage);
                } else {
                    setIsValidImage(false);
                    setErrorMessage('Image size exceeds the limit (1MB).');
                }
            } else {
                setIsValidImage(false);
                setErrorMessage('Please choose JPEG/JPG/PNG image type.');
            }
        } else {
            setIsValidImage(false);
            setErrorMessage('No image selected.');
        }
    };

    const handleClick = () => {
        setSubmitClicked(true);
    };

    return (
        <div className='product'>
            <h2>Insert Product Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='product1'> Name :</label>
                    <input className='box1'
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder='Enter Product Name'
                    />
                    {submitClicked && errors.name && <p className="error"><MdError className='icon' />{errors.name}</p>}
                </div>
                <div className='imgbox'>
                    Product Image
                    <div className='di'>
                        <label className="imgbox2">(jpg,png,jpeg Only)</label>
                        <div className='file1'>
                            <input type="file" onChange={handleImageChange}></input>
                        </div>
                    </div>
                </div>
                {submitClicked && !isValidImage && <div style={{ color: 'red' }} className='error9'><MdError className='icon' />{errorMessage}</div>}
                {isValidImage && imagePreview && <img className='error10' style={{ size: "4px" }} src={imagePreview} alt="Preview" />}
                <div>
                    <label className='product2'>Color :</label>
                    <input className='box2'
                        type="text"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        placeholder='Enter Color of the product'
                    />
                    {submitClicked && errors.color && <p className="error1"><MdError className='icon' />{errors.color}</p>}
                </div>
                <div>
                    <label className='product3'>Price :</label>
                    <input placeholder='enter Price of the product' className='box3'
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                    {submitClicked && errors.price && <p className="error2"><MdError className='icon' />{errors.price}</p>}
                </div>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="Cloths">Cloths</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Medicines">Medicines</option>
                    <option value="Grocery">Grocery</option>
                </select>
                <div>
                    <label className='product4'>Size :</label>
                    <input className='box4' placeholder='Enter Size of the Product'
                        type="text"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                    />

                    {errors.size && <p className="error3"><MdError className='icon' />{errors.size}</p>}
                </div>

                <div>
                    <label className='product5'>Weight :</label>
                    <input className="box5" placeholder='Weight of the product'
                        type="text"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                    />
                    {errors.weight && <p className="error4"><MdError className='icon' />{errors.weight}</p>}
                </div>


                {submitClicked && errors.category && <p className="error5"><MdError className='icon' />{errors.category}</p>}
                <div>
                    <textarea name="Description" placeholder='more details about product(optional)' rows="3">More details about product (Optional)</textarea>
                </div>
                <button onClick={handleClick} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Productdetails;
