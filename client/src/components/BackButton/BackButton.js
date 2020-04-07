import React from 'react';
import backButton from '../../assets/keyboard_arrow_left.svg';
import './BackButton.scss';

const BackButton = (props) => {
    return  props.hideMenu ? <img src={backButton} onClick={props.hideMenu} className="back_button" />  : <img src={backButton} onClick={props.goBack} className="back_button" /> 
}

export default BackButton;
