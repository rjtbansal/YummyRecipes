import React from 'react';
import './Recipe.scss';

const Recipe = ({recipeData}) => {
    return <div className="recipe">
        <h3 className="recipe__name"> { recipeData.name } </h3>
        <h4> { recipeData.cuisine } </h4>
        <img className="recipe__image" src = { recipeData.image } alt="" />
    </div>
}

export default Recipe;
