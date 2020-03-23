import React from 'react';
import './RecipeDetails.scss';
import axios from 'axios';
import backButton from '../../assets/keyboard_arrow_left.svg';

export default class RecipeDetails extends React.Component {

    state = {
        recipeDetailsData: {},
        recipeInstructionsArr: [] //to split instructions string by new line when available
    }

    getRecipeDetails = id => {
        axios.get(`http://localhost:3000/recipes/${id}`)
             .then(recipeDetailsRes => {
                 this.setState({
                    recipeDetailsData: recipeDetailsRes.data
                 });
                 return this.state.recipeDetailsData;
             })
             .then(res => {
                 this.setState({  //doing split below to be able to get array of instructions
                     recipeInstructionsArr: this.state.recipeDetailsData.instructions.split('\n')
                 })
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
                        <ul>
                        { this.state.recipeDetailsData.ingredients.map(ingredient => 
                                <li> 
                                    { ingredient.name } - { ingredient.portionSize}
                                </li>
                        ) }
                        </ul>
                </div>
                 <h3>Instructions</h3>
                <ul className="recipe-details__instructions">
                    { this.state.recipeInstructionsArr.map(recipeInstruction => <li> {recipeInstruction} </li>)}
                </ul>
            </div>
        );
    }
}