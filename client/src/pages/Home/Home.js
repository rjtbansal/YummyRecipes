import React, { Component } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Cuisine from '../../components/Cuisine/Cuisine';
import Category from '../../components/Category/Category';
import Recipe from '../../components/Recipe/Recipe';
import './Home.scss';
import axios from 'axios';

class Home extends Component {

    state = {
        recipesData: [],
        cuisinesData: [],
        categoriesData: []
       
    }
    
    getCuisines = () => {
        axios.get('http://localhost:3000/cuisine')
            .then(cuisines => {
                console.log(cuisines.data);
                this.setState({
                    cuisinesData: cuisines.data
                })
            })
            .catch(err => console.error(err));
    }

    getCategories = () => {
        axios.get('http://localhost:3000/category')
            .then(categories => {
                console.log(categories.data);
                this.setState({
                    categoriesData: categories.data
                })
            })
            .catch(err => console.error(err));
    }

    getRandomRecipes = () => {
        axios.get('http://localhost:3000/recipes/random')
            .then(recipes => {
              console.log(recipes.data);
                this.setState({
                    recipesData: recipes.data
                })
            })
            .catch(err => console.error(err));
    }
    

    componentDidMount(){
        this.getRandomRecipes();
        this.getCuisines();
        this.getCategories();
    }

    render() {
    if(!this.state.recipesData.length && !this.state.categoriesData.length && !this.state.cuisinesData.length){
        return (
            <h2> Loading recipes data...Please wait</h2>
        );
    }
    return <div className="home">
        <h3>Today's Recipes</h3>
        <Carousel>
            {
                this.state.recipesData.map( recipeData => <Recipe key= {recipeData._id} recipeData = { recipeData } /> )
            }
        </Carousel>

        <h3>Explore Our Cuisines</h3>
        <Carousel>
            {
                this.state.cuisinesData.map( cuisineData => <Cuisine key= {cuisineData._id} cuisineData = { cuisineData } /> )
            }
        </Carousel>

        <h3>Explore Our Categories</h3>
        <Carousel>
        {
                this.state.categoriesData.map( categoryData => <Category key= {categoryData._id} categoryData = { categoryData } /> )
            }
        </Carousel>

    </div>
    }
}

export default Home;
