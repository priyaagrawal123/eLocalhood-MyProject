import React, { useState } from 'react';
import './Forgotpass2.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Forgotpass2() {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    function handleChange(e) {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
        if (password == "") {
            setMessage("Please enter Password")
        }
        else if (regExp.test(password)) {
            setMessage("Password is Valid")
        }
        else if (!regExp.test(password)) {
            setMessage("Password is not Valid")
        }
        else {
            setMessage(" ")
        }
    }


    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input type="password" onChange={handleChange} value={password} placeholder='New Password' />
                    {/* <span className='visible' onClick={handleToogle}>
                        {passwordIcon}
                    </span> */}
                    <FaEye className='eyeicon' />
                </div>

                <div className='input-box'>
                    <input type="password" placeholder='Confirm Password' />
                    <FaEye className='eyeicon' />
                </div>
                <button className='btn btn-success'>Proceed</button>
                <p>{message}</p>
            </form>
        </div >
    )
}
export default Forgotpass2;