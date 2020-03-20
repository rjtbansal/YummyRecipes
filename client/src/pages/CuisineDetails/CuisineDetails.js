import React from 'react';
import axios from 'axios';
import Recipe from '../../components/Recipe/Recipe';
import backArrow from '../../assets/keyboard_arrow_left.svg';
import './CuisineDetails.scss';

export default class CuisineDetails extends React.Component {
    state = {
        cuisineRecipesData: []
    }

    getRecipesByCuisines = id => {
        axios.get(`http://localhost:3000/cuisine/${id}`)
              .then(res => {
                this.setState({
                    cuisineRecipesData: res.data
                });
              })
              .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getRecipesByCuisines(this.props.match.params.id);
    }

    goBack = () => this.props.history.goBack();

    render() {
        console.log(this.state.cuisineRecipesData)
        return(
           
            <div> 
                <img onClick={ this.goBack } src={backArrow} alt="back-arrow-img" />
                <div className="cuisine-details">
                {
                   this.state.cuisineRecipesData.map(cuisineRecipeData => <Recipe key= {cuisineRecipeData._id} recipeData = {cuisineRecipeData} />)
                }
                </div>
            </div>
        );
    }
}