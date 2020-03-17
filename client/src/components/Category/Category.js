import React from 'react';

const Category = ({categoryData}) => {
    console.log(categoryData);
    return <div>
        <h3>{ categoryData.name }</h3>
        <img src={categoryData.image} alt="image" />
    </div>
}

export default Category;