import React from 'react';
import './Cuisine.scss';
import {Link} from 'react-router-dom';

const Cuisine = ({cuisineData}) => {

    return <Link to={`/cuisines/${cuisineData._id}`} className="cuisine">
        <h3 className="cuisine__title">{ cuisineData.name }</h3>
    </Link>
}

export default Cuisine;
