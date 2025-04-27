import React from "react";
import "./Dashnav.css";
import { FaBars } from "react-icons/fa";
import "./profile.jpg";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Dashnav = ({ sidebarOpen, openSidebar }) => {
    return (

        <div className="dashnav">
            <h1>Seller Dashboard</h1>
            <div className="baricon" onClick={() => openSidebar()}>
                <FaBars className="baricon" /></div>
            <div className='searchbox'>
                <input type='text' placeholder='Search for products & Services' />
                <FaSearch className='searchicon' />
            </div>


            <a href="/">My Profile
                <img className="profileimage" src={require('./profile.jpg')} alt="profile" />
            </a>

        </div>

    )

}
export default Dashnav;