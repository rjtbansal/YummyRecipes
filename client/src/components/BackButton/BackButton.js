import React from 'react';
import backButton from '../../assets/keyboard_arrow_left.svg';
import './BackButton.scss';

const BackButton = (props) => {
    return <img src={backButton} onClick={props.goBack} className="back_button" />
}

export default BackButton;
