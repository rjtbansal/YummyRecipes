import React from 'react';
import './Header.scss';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';

const Header = () => {

    return <section className="header">    
        <Link to="/" className ="header__logo">Yummy Recipes</Link>
        <Nav />
    </section>

}

export default Header;
