import React, { useEffect, useState } from 'react'
import './Sellerdetails.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MdError } from "react-icons/md";
import Stepper from './Stepper'; // Import StepperComponent

function Sellerdetails(handleNext) {


    const navigate = useNavigate('');

    const handlePage = () => {
        // Check if all required fields are valid before navigating
        if (!isValidUsername || !isValidAadhar || !isValidBank || !isValidUPI || !isValidImage1 || !isValidImage2 || !isValidImage3 || !isValidImage4 || username.length === 0 || aadharNumber.length === 0 || upiId.length === 0 || image1 === null || image2 === null || image3 === null || image4 === null) {
            setError(true);
            setSubmitClicked(true);
            if (bank.trim() === '') {
                setBankError('Bank Account Number is required');
            } // Set submitClicked to true when button is clicked
            return;
        }
        setError(false);
        setSubmitClicked(true); // Set submitClicked to true when button is clicked
        // navigate('/shopdetails');
    }

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState(null);
    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [aadharNumber, setAadharNumber] = useState('');
    const [isValidAadhar, setIsValidAadhar] = useState(true);
    const [bank, setBank] = useState(' ');
    const [isValidBank, setIsValidBank] = useState(true);
    const [upiId, setUPIId] = useState('');
    const [isValidUPI, setIsValidUPI] = useState(true);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [isValid1, setIsValid1] = useState(true);
    const [isValid2, setIsValid2] = useState(true);
    const [isValid3, setIsValid3] = useState(true);
    const [isValid4, setIsValid4] = useState(true);
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [errorMessage4, setErrorMessage4] = useState('');
    const [isValidImage1, setIsValidImage1] = useState(true);
    const [isValidImage2, setIsValidImage2] = useState(true);
    const [isValidImage3, setIsValidImage3] = useState(true);
    const [isValidImage4, setIsValidImage4] = useState(true);
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const formData = new FormData();
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');
    const [error, setError] = useState('');
    const newErrors = {};
    const [usernameError, setUsernameError] = useState('');
    const [currentStep, setCurrentStep] = useState(1); // Manage current step
    const [submitClicked, setSubmitClicked] = useState(false);
    const [bankError, setBankError] = useState('');
    const steps = ['Step 1: Signup', 'Step 2: Seller Details', 'Step 3: Shop Details', 'Step 4: Product Details'];


    useEffect(() => {
        console.log("In useeffect in sellerdetails..." + currentStep);
        // if (currentStep < steps.length - 1) {
        setCurrentStep(1);
        // }
    });


    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        setIsValidUsername(validateUsername(newUsername));
    };


    const validateUsername = (username) => {

        const isValid = /^[a-zA-Z]{1,10} [a-zA-Z]{1,10}$/
            .test(username) && username.length >= 3;
        return isValid;
    };

    const handleAadharChange = (event) => {
        const newAadharNumber = event.target.value;
        if (newAadharNumber.startsWith('0')) {

            return;
        };
        setAadharNumber(newAadharNumber);

        setIsValidAadhar(validateAadhar(newAadharNumber));
    };

    const validateAadhar = (aadhar) => {

        const aadharRegex = /^\d{4}\d{4}\d{4}$/;
        return aadharRegex.test(aadhar);
    };


    const handleUPIChange = (event) => {
        const newUPIId = event.target.value;
        if (newUPIId.startsWith('0')) {

            return;
        }
        setUPIId(newUPIId);

        setIsValidUPI(validateUPI(newUPIId));
    };

    const validateUPI = (upiId) => {

        const upiRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+$/;
        ;

        return upiRegex.test(upiId);
    };

    function timer() {
        alert("Successfully filled form s");
        navigate('/shopdetails');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Reset error states
        setIsValidImage1(true);
        setIsValidImage2(true);
        setIsValidImage3(true);
        setIsValidImage4(true);
        setErrorMessage1('');
        setErrorMessage2('');
        setErrorMessage3('');
        setErrorMessage4('');

        // Check if all required fields are valid
        if (!isValidUsername || !isValidAadhar || !isValidBank || !isValidUPI || !image1 || !image2 || !image3 || !image4) {
            setSubmitClicked(true);
            return;
        }

        // Create new instances of FileReader
        const reader1 = new FileReader();
        const reader2 = new FileReader();
        const reader3 = new FileReader();
        const reader4 = new FileReader();


        if (isValidUsername) {

            console.log('Username is valid:', username);
        } else {
            console.error('Invalid username!');
        }

        if (isValidAadhar) {

            console.log('Aadhar number is valid:', aadharNumber);
        } else {
            console.error('Invalid Aadhar number!');
        }

        if (isValidUPI) {

            console.log('UPI ID is valid:', upiId);
        } else {
            console.error('Invalid UPI ID!');
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

        if (!image3) {
            setIsValid3(false);
            setErrorMessage3('Image is required.');
        }

        if (!image4) {
            setIsValid4(false);
            setErrorMessage4('Image is required.');
        }

        if (isValid1 && isValid2 && isValid3 && isValid4) {

            console.log('Form submitted successfully!');
        } else {
            console.log('Form submission failed. Please correct errors.');
        }

        // formData.append('fullname', username);
        // formData.append('aadharNumber', aadharNumber);
        // formData.append('bankAccountNumber', bank);
        // formData.append('upiId', upiId);
        // formData.append('aadharFrontImage', image1);
        // formData.append('aadharBackImage', image2);
        // formData.append('passportPhoto', image3);
        // formData.append('qrCodeImage', image4);
        // Create a new FormData object
        const formData = new FormData();

        // Append form data
        formData.append('fullname', username);
        formData.append('aadharNumber', aadharNumber);
        // formData.append('bankAccountNumber', bank);
        formData.append('upiId', upiId);

        reader1.onload = () => {
            // Append the Data URL to the form data
            formData.append('aadharFrontImage', reader1.result);
        };
        reader2.onload = () => {
            formData.append('aadharBackImage', reader2.result);
        };
        reader3.onload = () => {
            formData.append('passportPhoto', reader3.result);
        };
        reader4.onload = () => {
            formData.append('qrCodeImage', reader4.result);
        };

        formData.append('fullname', username);
        formData.append('aadharNumber', aadharNumber);
        formData.append('upiId', upiId);

        axios.post('http://192.168.128.15:3002/submitForm', formData)
            .then((response) => {
                console.log(response.data);
                setTimeout(timer, 300);
                if (handleNext) handleNext(); //
                navigate("/shopdetails");

            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                alert("Error occurred while signing in");
            });
    };


    const handleImageChange = (event, setImage, setIsValid, setErrorMessage) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            const allowedTypes = ['image/jpeg', 'image/png', "image/jpg"];
            if (allowedTypes.includes(selectedImage.type)) {

                const maxSize = 1 * 1024 * 1024;
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
                setErrorMessage('Please choose JPEG/JPG/PNG image type.');
            }
        }
    };
    const handleImage1Change = (event) => {
        handleImageChange(event, setImage1, setIsValid1, setErrorMessage1);
    };

    const handleImage2Change = (event) => {
        handleImageChange(event, setImage2, setIsValid2, setErrorMessage2);
    };
    const handleImage3Change = (event) => {
        handleImageChange(event, setImage3, setIsValid3, setErrorMessage3);
    };

    const handleImage4Change = (event) => {
        handleImageChange(event, setImage4, setIsValid4, setErrorMessage4);
    };



    return (
        <div className='seller'>

            <form onSubmit={handleSubmit} >
                <h2 className='header3'>Seller Personal Details</h2>


                {/*your name*/}
                <label className='label1'>Fullname:</label>
                <input className='inputbox1' value={username}
                    onChange={handleUsernameChange} type='text' placeholder='Enter Your FullName' />


                {!isValidUsername && (

                    <p className="error1" style={{ color: 'red' }}><MdError className='icon' />Username is invalid.enter your first & lastname</p>
                )}
                {submitClicked && username.length === 0 && isValidUsername && (
                    <p className="error2"><MdError className='icon' />Username is required</p>
                )}
                {/*aadhar card image */}
                <div className='box'>
                    <label className='box2'>Aadhar card image</label>
                    <div className='box3'>
                        <label className='fimage'>Front image(jpg,png,jpeg Only)</label>
                        <div className='file1'>
                            <input onClick={(e) => { setFile(e.target.value) }} type='file' onChange={handleImage1Change} ></input>

                        </div>
                    </div>

                    {submitClicked && !isValid1 && <div style={{ color: 'red' }} className='error3'><MdError className='icon' />{errorMessage1}</div>}
                    {isValid1 && <img className='error4' style={{ size: "4px" }} src={image1} />}
                    <div className='box4'>
                        <label className='bimage'>Back image(jpg,png,jpeg Only)</label>
                        <div className='file2'>
                            <input type='file' onChange={handleImage2Change} ></input>
                        </div>
                    </div>

                    {!isValid2 && <div style={{ color: 'red' }} className='error5'>{errorMessage2}</div>}
                    {submitClicked && isValid2 && <div className='errorr3' style={{ color: 'red' }}>{error2}</div>}
                    {isValid2 && image2 && <img className='error6' src={image2} alt="Image 2" />}

                </div>
                {/*aadhar card number */}
                <label className='label2'>Aadhar No:</label>
                <div className='numberdiv'>
                    <input className='number' value={aadharNumber}
                        onChange={handleAadharChange} placeholder='Aadhar Card Number'></input>
                </div>

                {!isValidAadhar && (
                    <p className='error7' style={{ color: 'red' }}><MdError className='icon' />Invalid Aadhar number.xxxxxxxxxxxx this format </p>
                )}
                {submitClicked && aadharNumber.length === 0 && isValidAadhar && (
                    <p className="error8"><MdError className='icon' />aadhar number is required</p>
                )}

                {/*passport photo */}
                <div className='box5'>
                    <label className='box6'>Your Passport Photo</label>
                    <div className='box7'>
                        <label className="pphoto">(jpg,png,jpeg Only)</label>
                        <div className='file3'>
                            <input type="file" onChange={handleImage3Change}></input>
                        </div>
                    </div>
                </div>

                {!isValid3 && <div className='error9' style={{ color: 'red' }}><MdError className='icon' />{errorMessage3}</div>}
                {/* {submitClicked && !isValid3 && <div className='errorr3' style={{ color: 'red' }}></div>} */}
                {isValid3 && image3 && <img className='error10' src={image3} alt="Image 3" />}




                {/*upi id */}
                <label className='label4'>UPI Id:</label>
                <input className='upi' value={upiId}
                    onChange={handleUPIChange} placeholder='(xxxxxxxxxx@ybl/@axl)'></input>
                {!isValidUPI && (
                    <p className="error13" style={{ color: 'red' }}><MdError className='icon' />UPI ID invalid,xxxxxxxxxx@ybl/@axl </p>
                )}
                {submitClicked && upiId.length === 0 && isValidUPI && (
                    <p className="error14"><MdError className='icon' />UPI Id is required</p>
                )}
                {/*QR image */}
                <div className='box8'>
                    <label className='box9'>QR code Photo</label>
                    <div className='box10'>
                        <label className="qrphoto">(jpg,png,jpeg Only)</label>
                        <div className='file4'>
                            <input type="file" size="40px" onChange={handleImage4Change}></input>
                        </div>
                    </div>
                </div>
                {!isValid4 && <div className='error15' style={{ color: 'red' }}>{errorMessage4}</div>}
                {submitClicked && isValid4 && <div className='errorr4' style={{ color: 'red' }}>{error4}</div>}

                {isValid4 && image4 && <img className='error16' src={image4} alt="Image 4" />}
                {/*button*/}
                <button onChange={(e) => { setFile(e.target.files[0]) }} className='proceed' onClick={handlePage}>Proceed</button>
                {progress.started && <progress max="100" value={progress.pc}></progress>}
                {msg && <span>{msg}</span>}

            </form>

        </div>
    )
};

export default Sellerdetails;
