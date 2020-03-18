import React from 'react';
import './Category.scss';
import {Link} from 'react-router-dom';

const Category = ({categoryData}) => {
    return <div className="category">
        <Link className="category__link" to={`/categories/${categoryData._id}`}>
            <h3>{ categoryData.name }</h3>
            <img src={categoryData.image} alt="" />
        </Link>
    </div>
}

export default Category;