import React, { Component } from 'react';
import './Header.scss';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';
import Backdrop from '../Backdrop/Backdrop';

class Header extends Component {

    state = {
        mobileMenuOpen: false
    };

    menuClickHandler = () => {
        this.setState( prevState => {        
           return { mobileMenuOpen: !prevState.mobileMenuOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ mobileMenuOpen: false });
    }

    render(){

        let backdrop;
        if(this.state.mobileMenuOpen) {
            backdrop = <Backdrop clickBackdrop = { this.backdropClickHandler } />;
        }
        return <section className="header">    
            <MobileMenu showMobileMenu = { this.state.mobileMenuOpen } />
            <Link to="/" className ="header__logo">Yummy Recipes</Link>
            <Nav mobileMenuClickHandler = { this.menuClickHandler } />
            { backdrop }
        </section>
    }
}

export default Header;
