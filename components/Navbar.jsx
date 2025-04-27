import React from 'react';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import './Navbar.css';
import { toBeRequired } from '@testing-library/jest-dom/matchers';
// import { Headerlink } from "react-router-dom";
// import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='Navbar'>
            <div className='logo'>
                <img src={require('./logo.jpg')} />
            </div>
            <div className='searchbox'>
                <input type='text' placeholder='Search for products & Services' />
                <FaSearch className='searchicon' />
            </div>
            <div>
                <button className='button1'>Cart
                    <FaShoppingCart className='carticon' />
                </button>
            </div>
        </div>


    );
}

export default Navbar;


