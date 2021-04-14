import React from 'react';
import './Header.css'


const Header = () => {
    let date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()]
    const year = date.getFullYear('YYYY');
    const day = date.getDate() + 1;
    return (
        <div className="header">
            <div className="headerContent">
                <i className="fa fa-angle-left fa-2x"></i>
                <span className="date">{`${day}  ${month}  ${year}`}</span>
                <i className="fa fa-angle-right fa-2x"></i>
            </div>
        </div>
    )
}

export default Header;