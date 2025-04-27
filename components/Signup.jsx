import React, { useState } from 'react';
import { MdEmail, MdError } from "react-icons/md";
import { FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import Stepper from './Stepper'; // Import the Stepper component

const Signup = ({ onNextStep }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPass, setIsValidPass] = useState(false);
    const [phoneno, setPhoneno] = useState('');
    const [isValidPhoneno, setIsValidPhoneno] = useState(false);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isPassMatch, setPassMatch] = useState(true);
    const [error, setError] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const steps = ['Step 1: Signup', 'Step 2: Seller Details', 'Step 3: Shop Details', 'Step 4: Product Details'];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@gmail\.com$/.test(email) && email.length >= 3;
        return isValid;
    };

    const handlePhonenoChange = (event) => {
        const newPhoneno = event.target.value;
        if (newPhoneno.startsWith('0')) {
            return;
        }
        setPhoneno(newPhoneno);
        setIsValidPhoneno(validatePhoneno(newPhoneno));
    };

    const validatePhoneno = (phoneno) => {
        const phonenoRegex = /^\d{10}$/;
        return phonenoRegex.test(phoneno);
    };

    const handlePassChange = (event) => {
        const newPass = event.target.value;
        setPass(newPass);
        setIsValidPass(validatePass(newPass));
        setPassMatch(newPass === confirmPass); // Ensure the passwords match
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePass = (pass) => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passRegex.test(pass);
    };

    const handleConfirmPassChange = (event) => {
        const newConfirmPass = event.target.value;
        setConfirmPass(newConfirmPass);
        setPassMatch(pass === newConfirmPass);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);

        if (!isValidEmail || !isValidPhoneno || !pass || !confirmPass) {
            setError(true);
            return;
        }

    //     axios.post('http://192.168.128.90:3000/api/Sign_Up', {
    //         Email: email,
    //         Phoneno: phoneno,
    //         Pass: pass,
    //         ConfirmPass: confirmPass
    //     })
    //         .then((response) => {
    //             console.log(response.data);
    //             alert("Successfully signed in");
    //             // onNextStep();
                navigate("/sellerdetails");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    };

    return (
        <div className="wrapper">
            {/* <Stepper steps={steps} currentStep={currentStep} /> Render the Stepper component */}
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={require('./logo.jpg')} alt="Logo" />
                </div>
                <h2 className='header2'>Signup</h2>

                {/* Email */}
                <big className="email">Email</big>
                <MdEmail className='mailicon' />
                <div className="inputbox1">
                    <input type="text" placeholder="Enter Your email" onChange={handleEmailChange} value={email} required />
                </div>
                {!isValidEmail && email.length > 0 && (
                    <p className="error1" style={{ color: 'red' }}><MdError className='icon' />Email is invalid. USE e.g., example@gmail.com</p>
                )}
                {error && !email && <p className='error2' style={{ color: 'red' }}><MdError className='icon' />Email is required</p>}

                {/* Phone number */}
                <big className="phonen">Phone No</big>
                <FaPhone className='phoneicon' />
                <div className="inputbox2">
                    <input type="tel" value={phoneno} onChange={handlePhonenoChange} maxLength="10" placeholder="Enter Your Phone number" />
                </div>
                {!isValidPhoneno && phoneno.length > 0 && (
                    <p className='error3' style={{ color: 'red' }}><MdError className='icon' />Invalid Phone number. It should be 10 digits only</p>
                )}
                {error && !phoneno && <p className='error4' style={{ color: 'red' }}><MdError className='icon' />Phone number is required</p>}

                {/* Password */}
                <div className="inputbox3">
                    <input
                        placeholder='Create Password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handlePassChange}
                        value={pass}
                    />
                    {!isValidPass && pass.length > 0 && (
                        <p className="errorr4" style={{ color: 'red' }}><MdError className='icon' />Password should be 8 char long & 1 special char</p>
                    )}
                    {!pass && error && <p className='error5' style={{ color: 'red' }}><MdError className='icon' />Password is required</p>}
                </div>
                <span
                    className="password-toggle1"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

                {/* Confirm Password */}
                <div className="inputbox4">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={handleConfirmPassChange}
                        placeholder="Confirm Password"
                        value={confirmPass}
                    />
                </div>
                {error && !confirmPass && <p className='error7' style={{ color: 'red' }}><MdError className='icon' />Confirm Password is required</p>}
                {!isPassMatch && confirmPass && <p className="error8" style={{ color: 'red' }}><MdError className='icon' />Passwords do not match</p>}
                <span
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

                <button type="submit">Signup</button>
                <div className='loginlink'>
                    Already have an Account? <Link to="/Login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;
