import React from 'react';
import './MobileMenu.scss';
import {NavLink} from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

const MobileMenu = props => {

  let menuClasses = 'mobile-nav';
  if(props.showMobileMenu) {
    menuClasses = 'mobile-nav open';
  }

  return (
    <nav className={ menuClasses }>
      <BackButton hideMenu = { props.hideMobileMenu } className = "mobile-nav__backbutton" />
      <ul className="mobile-nav__list">
        <li className = "mobile-nav__item">
          <NavLink exact activeClassName="mobile-nav__link--active" className="mobile-nav__link"  to="/">Home</NavLink>
        </li>
        <li className = "mobile-nav__item">
            <NavLink activeClassName="mobile-nav__link--active" className="mobile-nav__link"  to="/categories">Categories</NavLink>
        </li>
        <li className = "mobile-nav__item">
            <NavLink activeClassName="mobile-nav__link--active" className="mobile-nav__link"  to="/cuisines">Cuisines</NavLink>
        </li>
        <li className = "mobile-nav__item">
            <NavLink activeClassName="mobile-nav__link--active" className="mobile-nav__link"  to="/uploaded-recipes">User Recipes</NavLink>
        </li>
        <li className = "mobile-nav__item">
            <NavLink activeClassName="mobile-nav__link--active" className="mobile-nav__link"  to="/upload">Upload Recipes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MobileMenu;