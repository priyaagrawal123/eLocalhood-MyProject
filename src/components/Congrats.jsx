import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import "./Congrats.css";
import { useNavigate } from 'react-router-dom';

const Congrats = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="congrats-container">
            <div className="congrats-box">
                <RiVerifiedBadgeFill className="verified-icon" />
                <h2 className="congrats-title">Success!</h2>
                <p className="congrats-message">
                    Congratulations! Your account has been successfully created in E-Localhood.
                </p>
                <button className="continue-button" onClick={handleClick}>
                    Continue to Login
                </button>
            </div>
        </div>
    );
};

export default Congrats;