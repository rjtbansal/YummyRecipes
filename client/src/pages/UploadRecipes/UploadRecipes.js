import React from 'react';

const UploadRecipes = () => {
    return <div>
        <h2>
            Share Your Culinary Art
        </h2>
        <div>
            <label htmlFor="recipe-name">Recipe Name</label>
            <input name="recipe-name" />
        </div>
        <div>
            <label htmlFor="cuisine">Cuisine</label>
            <input name="cuisine" />
        </div>
        <div>
            <label htmlFor="ingredients">Ingredients & Portion Sizes</label> <br />
            <textarea name="ingredients" rows='10' columns='30' placeholder="Ingredients separated by commas, portions seperated by :" />
        </div>
        <div>
            <label htmlFor="instructions">Instructions</label> <br />
            <textarea name="instructions" rows='10' columns='30' />
        </div>
        {/* Work on recipe image upload */}
        <button>Reset</button>
        <button>Upload</button>
    </div>
}

export default UploadRecipes;
