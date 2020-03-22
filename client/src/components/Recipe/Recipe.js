import React from 'react';
import './Recipe.scss';
import {Link} from 'react-router-dom';
import EllipsisText from "react-ellipsis-text";

const Recipe = ({recipeData}) => {
    return <div className="recipe">
        <Link className="recipe__link" to={`/recipes/${recipeData._id}`}>
            <h3 className="recipe__name"> <EllipsisText text={ recipeData.name } length={"25"}/> </h3>
            <div className = "recipe__subdiv">
                <h4> { recipeData.cuisine }   </h4>
                <h4> { recipeData.category }  </h4>
            </div>
            <img className="recipe__image" src = { recipeData.image } alt= {`${recipeData.name}-image`} />
        </Link>
    </div>
}

export default Recipe;
