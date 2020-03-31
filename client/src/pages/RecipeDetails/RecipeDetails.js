import React from 'react';
import './RecipeDetails.scss';
import axios from 'axios';
import BackButton from '../../components/BackButton/BackButton';

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
                 console.log(this.state.recipeDetailsData.addedBy);
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
                <BackButton goBack={this.goBack} />
                <div className="recipe-details__title-image">
                    <h3 className="recipe-details__name"> { this.state.recipeDetailsData.name } </h3>
                    <div className="recipe-details__subdiv">
                        <h4> { this.state.recipeDetailsData.cuisine } </h4>
                        <h4> { this.state.recipeDetailsData.category ? this.state.recipeDetailsData.category : this.state.recipeDetailsData.addedBy } </h4>
                    </div>
                    {
                        this.state.recipeDetailsData.image 
                        ?
                        <img className="recipe-details__image" src={ this.state.recipeDetailsData.image } alt= {`${this.state.recipeDetailsData.name}image`} />
                        :
                        <div className="recipe-details__image-placeholder">
                            <h3>Image Unavailable</h3>
                        </div>
                    }
                </div>
                    <h3 className="recipe-details__title"> Ingredients </h3>
                        <ul className= "recipe-details__ingredients">
                        { this.state.recipeDetailsData.ingredients.map(ingredient => 

                             this.state.recipeDetailsData.addedBy !== 'guest' 
                             ?
                                <li  className="recipe-details__spacing"> 
                                    { ingredient.name } - { ingredient.portionSize}
                                </li>
                             : 
                                <li className="recipe-details__spacing">
                                    { ingredient }
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