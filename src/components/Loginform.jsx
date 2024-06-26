import React, { useState } from 'react';
import './Loginform.css';
import { FaLock } from "react-icons/fa";
import { MdEmail, MdError } from "react-icons/md";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie'
import { FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa6';


function Loginform() {
    const handleClick = () => {
        setSubmitClicked(true);

        if (!isValidEmail || !isValidPass || email.length === 0 || pass.length === 0) {
            setError(true);
            return;
        }
        setError(false);
        // navigate('/sellerdetails');

    }

    const [email, setEmail] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPass, setIsValidPass] = useState(false);
    // const [cookies, setCookie] = useCookies(['user']);
    // const [customerID, setCustomerId] = useState(false);
    const [submitClicked, setSubmitClicked] = useState("");

    const navigate = useNavigate('');

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const handlePassChange = (event) => {
        const newPass = event.target.value;
        setPass(newPass);
        setIsValidPass(validatePass(newPass));
    };

    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@gmail\.com$/.test(email) && email.length >= 3;
        return isValid;
    };

    const validatePass = (pass) => {
        const isValid = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\d])(?=.*[a-zA-Z]).{8,15}$/.test(pass) && pass.length >= 8;
        return isValid;
    };
    function timer() {
        alert("Successfully logged in");
        navigate('/dashboard');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);

        if (!isValidEmail || !isValidPass || email.length === 0 || pass.length === 0) {
            setError(true);
            return;
        }
        setError(false);

        axios.post('http://192.168.128.90:3000/api/Login', {
            Email: email,
            Pass: pass
        })
            .then((response) => {
                console.log(response.data);
                // const customerID = response.data.user.id;
                // setCustomerId(customerID)
                // console.log("Customer ID:: " + customerID);
                // Cookies.set('customerID', customerID);
                setTimeout(timer, 300);
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                alert("Error occurred while login in");
            });
    };

    return (
        <div className='loginform'>
            <form onSubmit={handleSubmit}>
                <h2 className='header1'>Log in/Sign in</h2>
                <div className='input-box1'>
                    <input type="email" placeholder='Enter Your email' onChange={handleEmailChange} value={email} required />
                    <big className='mail'>email</big>
                    <MdEmail className='icon' />
                </div>
                {!isValidEmail && !email.length == 0 && (
                    <p className="error1" style={{ color: 'red' }}><MdError className='icon' />Email is invalid. Please use standard email format, e.g., example@gmail.com</p>
                )}
                {error && email.length === 0 && <label className='error2' style={{ color: 'red' }}><MdError className='icon' />Email is required</label>}

                <div className='input-box2'>
                    <input type={inputType} placeholder='Enter Your Password' onChange={handlePassChange} value={pass} required />
                    <i
                        onClick={togglePasswordVisiblity}
                        className={`fa ${passwordShown ? 'fa-eye' : 'fa-eye-slash'}`}
                        aria-hidden="true"
                        style={{ position: 'absolute', top: '50%', left: '214px', top: "18px", transform: 'translateY(-50%)', cursor: 'pointer' }}

                    />
                    <big className='pass'>Password</big>
                    <FaLock className='icon' />
                </div>
                {!isValidPass && !pass.length == 0 && (
                    <p className='error3' style={{ color: 'red' }}><MdError className='icon' />Invalid Password. Must contain at least 1 special character, 1 digit, and be 8-15 characters long</p>
                )}
                {error && pass.length === 0 && <label className='error4' style={{ color: 'red' }}><MdError className='icon' />Password is required</label>}

                <div className='Remember-me'>
                    <label className='label1'><input type='checkbox' />Remember me</label>
                </div>
                <a href="/">Forgot Password?</a>
                <button onClick={handleClick} className="button1" type="submit">Login</button>
                <div className='Register-link'>
                    <p>New to e-Localhood?</p>
                    <Link to='/signup'> SignUp</Link>
                </div>
            </form>
        </div>
    );
}

export default Loginform;
