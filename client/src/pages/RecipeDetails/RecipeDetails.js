import React from 'react';
import './RecipeDetails.scss';
import axios from 'axios';

export default class RecipeDetails extends React.Component {

    state = {
        recipeDetailsData: {}
    }
    getRecipeDetails = id => {
        axios.get(`http://localhost:3000/recipes/${id}`)
             .then(recipeDetailsRes => {
                 //console.log(recipeDetailsRes.data.ingredients);
                 this.setState({
                    recipeDetailsData: recipeDetailsRes.data
                 });
             })
             .catch(err => console.error(err));
    } 

    componentDidMount() {
        this.getRecipeDetails(this.props.match.params.id);
    }

    render() {
        if(!this.state.recipeDetailsData.ingredients){
            return (
                <h2>Recipe Details data loading. Please Wait</h2>
            );
        }
        return (
            <div>
                <h3> { this.state.recipeDetailsData.name } </h3>
                <h4> { this.state.recipeDetailsData.cuisine } </h4>
                <h4> { this.state.recipeDetailsData.category } </h4>
                <img src={ this.state.recipeDetailsData.image } />
                <h3> Ingredients </h3>
                    { this.state.recipeDetailsData.ingredients.map(ingredient => 
                            <p> 
                                { ingredient.name } - { ingredient.portionSize }
                            </p>
                    ) }
                 <h3>Instructions</h3>
                <p>
                    { this.state.recipeDetailsData.instructions }
                </p>
            </div>
        );
    }
}