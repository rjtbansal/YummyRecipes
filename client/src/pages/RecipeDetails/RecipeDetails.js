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
                <div className="recipe-details__title-image">
                    <h3 className="recipe-details__name"> { this.state.recipeDetailsData.name } </h3>
                    <div className="recipe-details__subdiv">
                        <h4> { this.state.recipeDetailsData.cuisine } </h4>
                        <h4> { this.state.recipeDetailsData.category } </h4>
                    </div>
                    <img className="recipe-details__image" src={ this.state.recipeDetailsData.image } />
                </div>
                    <h3 className="recipe-details__title"> Ingredients </h3>
                        <ul className= "recipe-details__ingredients">
                        { this.state.recipeDetailsData.ingredients.map(ingredient => 
                                <li  className="recipe-details__spacing"> 
                                    { ingredient.name } - { ingredient.portionSize}
                                </li>
                        ) }
                        </ul>
                    <h3 className="recipe-details__title">Instructions</h3>
                    <ul className="recipe-details__instructions">
                        { 
                            this.state.recipeInstructionsArr.filter(recipeInstruction => recipeInstruction.length !== 0 && recipeInstruction.length !==1)
                                                            .map(recipeInstruction => <li className="recipe-details__spacing"> {recipeInstruction} </li>)
                        }
                    </ul>
            </div>
        );
    }
}