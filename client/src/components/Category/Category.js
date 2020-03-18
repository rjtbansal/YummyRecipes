import React from 'react';
import './Category.scss';
const Category = ({categoryData}) => {
    return <div>
        <h3>{ categoryData.name }</h3>
        <img src={categoryData.image} alt="image" />
    </div>
}

export default Category;