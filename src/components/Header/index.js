import React from 'react';

import './style.css';

import logo from '../../assets/img/helpper-logo.png';

const Header = () => (
    <header>
        <img src={logo} style={{width: 200, height: 60}} />
    </header>
);

export default Header;