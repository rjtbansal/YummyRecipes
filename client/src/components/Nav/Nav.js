import React from 'react';
import './Nav.scss';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return <nav className= "nav">
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
                <NavLink activeClassName="nav__link--active" className="nav__link"  to="/upload">Upload Recipes</NavLink>
            </li>
        </ul>
    </nav>
}

export default Nav;
