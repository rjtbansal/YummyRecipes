import React from 'react';
import './RecipeDetails.scss';
import axios from 'axios';
import backButton from '../../assets/keyboard_arrow_left.svg';

export default class RecipeDetails extends React.Component {

    state = {
        recipeDetailsData: {}
    }

    getRecipeDetails = id => {
        axios.get(`http://localhost:3000/recipes/${id}`)
             .then(recipeDetailsRes => {
                 this.setState({
                    recipeDetailsData: recipeDetailsRes.data
                 });
             })
             .catch(err => console.error(err));
    } 

    componentDidMount() {
        this.getRecipeDetails(this.props.match.params.id);
    }

    goBack = () => this.props.history.goBack();

    render() {
        if(!this.state.recipeDetailsData.ingredients){
            return (
                <h2>Recipe Details data loading. Please Wait</h2>
            );
        }
        return (
            <div className="recipe-details">
                <img className="recipe-details__back-button" onClick={this.goBack} src={backButton} />
                <h3> { this.state.recipeDetailsData.name } </h3>
                <div className="recipe-details__subdiv">
                    <h4> { this.state.recipeDetailsData.cuisine } </h4>
                    <h4> { this.state.recipeDetailsData.category } </h4>
                </div>
                <img className="recipe-details__image" src={ this.state.recipeDetailsData.image } />
                <div className="recipe-details__ingredients-subdiv">
                    <h3> Ingredients </h3>
                        { this.state.recipeDetailsData.ingredients.map(ingredient => 
                                <p> 
                                    { ingredient.name } - { ingredient.portionSize}
                                </p>
                        ) }
                </div>
                 <h3>Instructions</h3>
                <p>
                    { this.state.recipeDetailsData.instructions }
                </p>
            </div>
        );
    }
}