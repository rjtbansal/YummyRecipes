import React from 'react';
import './Header.scss';
import Nav from '../Nav/Nav';

const Header = () => {

    return <section className="header">
        <h1 className ="header__logo">Yummy Recipes</h1>
        <Nav />
    </section>

}

export default Header;
