import React from 'react';
import './CategoryDetails.scss';
import axios from 'axios';
import Recipe from '../../components/Recipe/Recipe';
import BackButton from '../../components/BackButton/BackButton';

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
            <div className="category-details-div"> 
                <BackButton goBack={this.goBack} />
                <div className="category-details">
                {
                    this.state.categoryRecipesData.map(categoryRecipeData => <Recipe key= {categoryRecipeData._id} recipeData = {categoryRecipeData} />)
                }
                </div>
            </div>
        );
    }
}