import React from 'react';
import axios from 'axios';
import Recipe from '../../components/Recipe/Recipe';
import './UserUploadedRecipes.scss';

export default class UserUploadedRecipes extends React.Component {

    state = {
        userRecipesData: []
    }

    getUserUploadedRecipes = () => {
        axios.get(`http://localhost:3000/recipes/byusers`)
             .then(res => {
                 this.setState(({
                     userRecipesData: res.data
                 }));
             })
             .catch(err => console.error(err));
    }

    goBack = () => this.props.history.goBack();

    componentDidMount() {
        this.getUserUploadedRecipes();
    }

    render() {
        return(       
                <div className="uploaded-recipes">
                    {
                        this.state.userRecipesData.length 
                        ? this.state.userRecipesData.map(userRecipeData => <Recipe key= {userRecipeData._id} recipeData = {userRecipeData} />)
                        : <h3>No Recipes Uploaded Yet</h3>
                    }
                </div>
        );
    }
}