import React from 'react';
import './CategoryDetails.scss';
import {Link} from 'react-router-dom';
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

    render() {
        return(
            <div>
                <Link to="/categories">
                    <img src={backArrow} alt="back-arrow-img" />
                </Link>
                <div className="category-details">
                {
                    this.state.categoryRecipesData.map(categoryRecipeData => <Recipe key= {categoryRecipeData._id} recipeData = {categoryRecipeData} />)
                }
                </div>
            </div>
        );
    }
}