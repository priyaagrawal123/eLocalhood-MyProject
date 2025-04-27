import React from 'react';
import "./Shopdetails.css";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { MdError } from "react-icons/md";
import axios from 'axios';
import Stepper from './Stepper'; // Import StepperComponent
const Shopdetails = () => {
    const navigate = useNavigate("");
    const handleClick = () => {
        if (!isValidShopname || !isValidAddress || !isValidPincode || !isValidWpnumber || !isValidImage1 || !isValidImage2 || shopname.length === 0 || address.length === 0 || pincode.length === 0 || wpnumber.length === 0 || image1.length === 0 || image2.length === 0) {

            setError(true);
            setSubmitClicked(true);
            return;
        }

        setError(false);
        setSubmitClicked(true);
        // navigate('/productdetails');
    };

    const [address, setAddress] = useState('');
    const [isValidAddress, setIsValidAddress] = useState(true);
    const [shopname, setShopname] = useState('');
    const [isValidShopname, setIsValidShopname] = useState(true);
    const [pincode, setPincode] = useState('');
    const [isValidPincode, setIsValidPincode] = useState(true);

    const [wpnumber, setWpnumber] = useState('');
    const [isValidWpnumber, setIsValidWpnumber] = useState(true);


    const [error, setError] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [isValid1, setIsValid1] = useState(true);
    const [isValid2, setIsValid2] = useState(true);
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [isValidImage1, setIsValidImage1] = useState(true);
    const [isValidImage2, setIsValidImage2] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);

    const [category, setCategory] = useState('');
    const [error6, setError6] = useState(false);
    const [delivery, setDelivery] = useState("");



    const handleShopnameChange = (event) => {
        const newShopname = event.target.value;
        setShopname(newShopname);

        setIsValidShopname(validateShopname(newShopname));
    };

    const validateShopname = (shopname) => {

        const shopnameRegex = /^[a-zA-Z0-9\s]{4,31}$/;
        return shopnameRegex.test(shopname);

    };

    const handleAddressChange = (event) => {
        const newAddress = event.target.value;
        setAddress(newAddress);

        setIsValidAddress(validateAddress(newAddress));
    };

    const validateAddress = (address) => {

        const addressRegex = /^[a-zA-Z0-9\s\,]{4,50}$/;
        return addressRegex.test(address);

    };

    const handlePincodeChange = (event) => {
        const newPincode = event.target.value;
        if (newPincode.startsWith('0')) {

            return;
        }
        setPincode(newPincode);

        setIsValidPincode(validatePincode(newPincode));
    };

    const validatePincode = (pincode) => {

        const pincodeRegex = /^\d{6}$/;
        return pincodeRegex.test(pincode);
    };


    const handleWpnumberChange = (event) => {
        const newWpnumber = event.target.value;
        if (newWpnumber.startsWith('0')) {

            return;
        };
        setWpnumber(newWpnumber);

        setIsValidWpnumber(validateWpnumber(newWpnumber));
    };

    const validateWpnumber = (wpnumber) => {
        // Number should not start with zero
        const wpnumberRegex = /^\d{10}$/;

        return wpnumberRegex.test(wpnumber);
    };


    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setCategory(value);
        if (!value.trim()) {
            setError6('Category is required');
        } else {
            setError6('');
        }
    }


    const handleImageChange = (event, setImage, setIsValid, setErrorMessage) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {

            const allowedTypes = ['image/jpeg', 'image/png', "image/jpg"];
            if (allowedTypes.includes(selectedImage.type)) {

                const maxSize = 1 * 1024 * 1024; // 1MB in bytes
                if (selectedImage.size <= maxSize) {
                    setImage(URL.createObjectURL(selectedImage));
                    setIsValid(true);
                    setErrorMessage('');
                } else {
                    setIsValid(false);
                    setErrorMessage('Image size exceeds the limit (1MB).');
                }
            } else {
                setIsValid(false);
                setErrorMessage('Invalid image type. Please choose a JPEG or PNG image.');
            }

        }
    };
    const handleImage1Change = (event) => {
        handleImageChange(event, setImage1, setIsValid1, setErrorMessage1);
    };

    const handleImage2Change = (event) => {
        handleImageChange(event, setImage2, setIsValid2, setErrorMessage2);
    }

    function timer() {
        alert("Successfully filled ");
        navigate('/productdetails');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);

        if (!category.trim()) {
            setError6('Category is required');
            return;
        }

        if (!isValidShopname || !isValidAddress || !isValidPincode || !isValidWpnumber || !isValidImage1 || !isValidImage2 || shopname.length === 0 || address.length === 0 || pincode.length === 0 || wpnumber.length === 0 || image1.length === 0 || image2.length === 0) {
            setError(true); // Set error state to true if any field is invalid or empty
            return;
        }

        setSubmitClicked(true);
        if (!image1) {
            setIsValid1(false);
            setErrorMessage1('Image is required.');
        }

        if (!image2) {
            setIsValid2(false);
            setErrorMessage2('Image is required.');
        }
        // axios.post('http://192.168.128.15:4002/shop', {
        //     shopName: shopname,
        //     category: category,
        //     shopAddress: address,
        //     pincode: pincode,
        //     whatsappNumber: wpnumber,
        //     deliveryDetails: delivery,
        //     shopPhoto: image1,
        //     ownerPhoto: image2
        // })
        //     .then((response) => {

        //         console.log(response.data);
        //         setTimeout(timer, 3000);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         if (error.response) {
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         }
                navigate('/productdetails');
        //     });
    }

    return (
        <div className='shop'>
            {/* Stepper at the top */}            <form onSubmit={handleSubmit}>

                <h2 className='header4'>ShopDetails</h2>

                {/*category shop */}
                <div className='selectcategory'>

                    <select category="category" onChange={handleCategoryChange}>
                        <option value="category">Category of Shop</option>
                        <option value="category">Bakery</option>
                        <option value="category">Medicines</option>
                        <option value="category">Electronics</option>
                        <option value="category">Grocery</option>
                        <option value="category">Cloths</option>
                        <option value="category">Other</option>
                    </select>
                </div>
                {error6 && <span className="categoryerror" style={{ color: 'red' }}><MdError className='icon' />{error6}</span>}

                {/*shop name */}
                <label className='label6'>Shopname:</label>
                <div className='inputbox1'>
                    <input type="text" onChange={handleShopnameChange} placeholder='Shop Name' />
                </div>
                {!isValidShopname && (

                    <p className="error1" style={{ color: 'red' }}><MdError className='icon' />Invalid Shopname ,it should be in 4-31 characters</p>
                )}
                {submitClicked && shopname.length === 0 && isValidShopname && (
                    <p className="error2"><MdError className='icon' />Shopname is required</p>
                )}



                {/*address */}
                <label className='label7'>Address:</label>
                <div className='inputbox2'>
                    <input type="text" value={address}
                        onChange={handleAddressChange} placeholder='Shop Address' />
                </div>

                {!isValidAddress && (
                    <p className='error3' style={{ color: 'red' }}><MdError className='icon' />Address should be in atleast 4 chracters</p>
                )}
                {submitClicked && address.length === 0 && isValidAddress && (
                    <p className="error4"><MdError className='icon' />address is required</p>
                )}

                {/*pincode */}
                <label className='label8'>Pincode:</label>
                <div className='inputbox3'>
                    <input type="text" value={pincode} onChange={handlePincodeChange} placeholder='pincode' />
                </div>
                {!isValidPincode && (
                    <p className="error5" style={{ color: 'red' }}><MdError className='icon' />Invalid pincode. Please enter a 6-digit pincode.</p>
                )}


                {submitClicked && pincode.length === 0 && isValidPincode && (
                    <p className="error6"><MdError className='icon' />pincode is required</p>
                )}

                {/*wp*/}
                <label className='label9'>WP No:</label>
                <div className='inputbox4'>
                    <input type='tel' placeholder='whatsapp no' onChange={handleWpnumberChange} value={wpnumber} maxLength={10} />
                </div>

                {!isValidWpnumber && (
                    <p className="error7" style={{ color: 'red' }}><MdError className='icon' />Invalid wpnumber.WP number should be in 10 digits only</p>
                )}

                {submitClicked && wpnumber.length === 0 && isValidWpnumber && (
                    <p className="error8"><MdError className='icon' />wpnumberis required</p>
                )}
                {/*delivery within km */}
                <label className='label10'>Delivery(Km):</label>
                <div className='inputbox5'>
                    <input type='text' placeholder='Delivery Within km eg:1KM' />
                </div>
                {/*shop photo */}
                <div className='box'>
                    <label className='box1'>Shop Photo</label>
                    <div className='box2'>
                        <label className="sphoto">(jpg,png,jpeg Only)</label>
                        <div className='file1'>
                            <input type="file" onChange={handleImage1Change}></input>
                        </div>
                    </div>
                </div>
                {!isValid1 && (
                    <p className="error9" style={{ color: 'red' }}><MdError className='icon' />{errorMessage1}</p>
                )}
                {isValid1 && image1 && <img className='error10' src={image1} alt="Image 3" />}

                {/*your photo */}
                <div className='box3'>
                    <label className='box4'>Your Photo inside the shop</label>
                    <div className='box5'>
                        <label className="yphoto">(jpg,png,jpeg Only)</label>
                        <div className='file2'>
                            <input type="file" onChange={handleImage2Change}></input>
                        </div>
                    </div>
                </div>
                {submitClicked && !isValid2 && (
                    <p className="error11" style={{ color: 'red' }}><MdError className='icon' />{errorMessage2}</p>
                )}
                {isValid2 && image2 && <img className='error12' src={image2} alt="Image 3" />}

                <button className='shopbutton' onClick={handleClick}>Next</button>
            </form >
        </div >
    )
}

export default Shopdetails;
