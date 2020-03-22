import React from 'react';
import axios from 'axios';
import Recipe from '../../components/Recipe/Recipe';

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
        console.log(this.state.userRecipesData)
        return(
            
            <div>
                <h2>
                    Explore Our Users Uploaded Recipes
                </h2>
                <div>
                    {
                        this.state.userRecipesData.length 
                        ? this.state.userRecipesData.map(userRecipeData => <Recipe key= {userRecipeData._id} recipeData = {userRecipeData} />)
                        : <h3>No Recipes Uploaded Yet</h3>
                    }
                </div>
            </div>
        );
    }
}