import React from 'react';
import './CategoryDetails.scss';
import axios from 'axios';
import Recipe from '../../components/Recipe/Recipe';
import backArrow from '../../assets/keyboard_arrow_left.svg';

export default class CategoryDetails extends React.Component {

    state = {
        categoryRecipesData: []
    }

    getRecipesByCategory = id => {
        axios.get(`http://localhost:3000/category/${id}`)
             .then(res => {
                 this.setState({
                     categoryRecipesData: res.data
                 });
             })
             .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getRecipesByCategory(this.props.match.params.id);
    }

    goBack = () => this.props.history.goBack();


    render() {
        return(
            <div> 
                <img onClick={ this.goBack } src={backArrow} alt="back-arrow-img" />
                <div className="category-details">
                {
                    this.state.categoryRecipesData.map(categoryRecipeData => <Recipe key= {categoryRecipeData._id} recipeData = {categoryRecipeData} />)
                }
                </div>
            </div>
        );
    }
}