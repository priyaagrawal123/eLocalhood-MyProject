import React from 'react';

const Stat = ({ title, value }) => {
    return (
        <div className="stat-box">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default Stat;