import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import "./Congrats.css";
import { useNavigate } from 'react-router-dom';


const Congrats = () => {

    const navigate = useNavigate("");
    const handleClick = () => {

        navigate('/login');
    };
    return (

        <div className='page'>
            <form>
                <RiVerifiedBadgeFill className='icon' />
                <h1>SUCCESS</h1>
                <h3>Congratulations! Your Account has been Successfully Created in E-Localhood</h3>
                <button onClick={handleClick} className='btn'>Contine</button>
            </form>
        </div>

    )
}

export default Congrats;
