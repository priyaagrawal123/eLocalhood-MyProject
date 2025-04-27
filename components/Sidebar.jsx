import React from 'react';
import './Sidebar.css';
import logo from './logo.jpg';
import { FaHome } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdOutlineSell, MdPayments, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { PiBellRingingFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import Order from './Order';
import Updatedelete from "./Updatedelete"
// import 'https://fonts.googleapis.com/css2?family=Anta&display=swap'

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className='sidebartitle'>
                <div className='sidebarimg'>
                    <img src={require("./logo.jpg")} alt="logo" />
                </div>
                <h2>e-Localhood</h2>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Anta&family=Signika+Negative:wght@300..700&display=swap')
                </style>


            </div>
            <div className='sidebarmenu'>

                <div className='sidebarlink'>

                    <a href="/dashboard" >Dashboard</a>
                </div>
                <div className='sidebarlink'>
                    <FaProductHunt className='icon' />
                    <a href="/updatedelete">Manage Products</a>
                </div>
                <div className='sidebarlink'>
                    <MdOutlineSell className='icon' />
                    <a href="/">Sell</a>
                </div>
                <div className='sidebarlink'>
                    <MdPayments className='icon' />
                    <a href="/" >Payments</a>
                </div>

                <div className='sidebarlink'>
                    <PiBellRingingFill className="icon" />
                    <a href="/order" >New Orders</a>
                </div>
                <div className='sidebarlink'>
                    <IoIosAddCircle className="icon" />
                    <a href="/productdetails" >Add Products</a>
                </div>
                <div className='sidebarlink'>
                    <a href="/details" >Product Details list</a>
                </div>
                <div className='sidebarlink'>
                    <FiLogOut className="icon" />
                    <a href="/" >Log out</a>
                </div>

            </div>
        </div>
    )
}
export default Sidebar;