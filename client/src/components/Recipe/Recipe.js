import React from 'react';
import './Recipe.scss';

const Recipe = ({recipeData}) => {
    return <div className="recipe">
        <h3 className="recipe__name"> { recipeData.name } </h3>
        <div className = "recipe__subdiv">
            <h4> { recipeData.cuisine }   </h4>
            <h4> { recipeData.category }  </h4>
        </div>
        <img className="recipe__image" src = { recipeData.image } alt="" />
    </div>
}

export default Recipe;
