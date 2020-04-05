import React from 'react';
import './Nav.scss';
import {NavLink} from 'react-router-dom';
import menu_closed_icon from '../../assets/menu_closed.svg';

class Nav extends React.Component {

    state = {
        isMenuOpened: false
    }

    onMenuClickHandler = () => {
        this.setState({
            isMenuOpened: !this.state.isMenuOpened
        });
    }



    render(){
    return <nav className= "nav">
            <img className="nav__menu--closed" onClick={ this.onMenuClickHandler } src={ menu_closed_icon } alt="" />
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

            {/* {           
            this.state.isMenuOpened 
            ?
            <ul className="nav__mobile" onClick = { this.onMenuClickHandler }>
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
            :
            null

            } */}
    </nav>
    }
}

export default Nav;
