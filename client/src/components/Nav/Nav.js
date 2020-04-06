import React from 'react';
import './Nav.scss';
import {NavLink} from 'react-router-dom';
import HamburgerButton from '../MobileMenu/HamburgerButton';

const Nav = props => {

    return <nav className= "nav">
            <HamburgerButton clickMobileMenu= {props.mobileMenuClickHandler} className="nav__menu--closed" />
            <ul className="nav__list">
                <li className = "nav__item">
                    <NavLink exact activeClassName="nav__link--active" className="nav__link"  to="/">Home</NavLink>
                </li>
                <li className = "nav__item">
                    <NavLink activeClassName="nav__link--active" className="nav__link"  to="/categories">Categories</NavLink>
                </li>
                <li className = "nav__item">
                    <NavLink activeClassName="nav__link--active" className="nav__link"  to="/cuisines">Cuisines</NavLink>
                </li>
                <li className = "nav__item">
                    <NavLink activeClassName="nav__link--active" className="nav__link"  to="/uploaded-recipes">User Recipes</NavLink>
                </li>
                <li className = "nav__item">
                    <NavLink activeClassName="nav__link--active" className="nav__link"  to="/upload">Upload Recipes</NavLink>
                </li>
            </ul>
    </nav>
    
}

export default Nav;
