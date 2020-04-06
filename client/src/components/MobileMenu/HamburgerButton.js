import React from 'react';
import hamburger_icon from '../../assets/menu_closed.svg';
import './HamburgerButton.scss';

const HamburgerButton = props => {
  return <img className="hamburger" src={hamburger_icon} onClick={ props.clickMobileMenu } alt="" />
}

export default HamburgerButton;