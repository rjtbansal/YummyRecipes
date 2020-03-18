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
        categoriesData: [],
        veggieAndVeganData: []
       
    }
    
    getCuisines = () => {
        axios.get('http://localhost:3000/cuisine')
            .then(cuisines => {
                this.setState({
                    cuisinesData: cuisines.data
                })
            })
            .catch(err => console.error(err));
    }

    getCategories = () => {
        axios.get('http://localhost:3000/category')
            .then(categories => {
                this.setState({
                    categoriesData: categories.data
                })
            })
            .catch(err => console.error(err));
    }

    getRandomRecipes = () => {
        axios.get('http://localhost:3000/recipes/random')
            .then(recipes => {
                this.setState({
                    recipesData: recipes.data
                })
            })
            .catch(err => console.error(err));
    }

    getVeganRecipes = () => axios.get('http://localhost:3000/category/11');
           
    getVegetarianRecipes = () => axios.get('http://localhost:3000/category/12');

    componentDidMount(){
        this.getRandomRecipes();
        this.getCuisines();
        this.getCategories();
        
        axios.all([this.getVegetarianRecipes() , this.getVeganRecipes()])
              .then(res => {
                  this.setState({
                    veggieAndVeganData: [...res[0].data, ...res[1].data]
                  });
              })
              .catch(err => console.log(err));
    }

    render() {
    if(!this.state.recipesData.length && !this.state.categoriesData.length && !this.state.cuisinesData.length){
        return (
            <h2> Loading recipes data...Please wait</h2>
        );
    }
    return <div className="home">
        <h2>Today's Recipes</h2>
        <Carousel>
            {
                this.state.recipesData.map( recipeData => <Recipe key= {recipeData._id} recipeData = { recipeData } /> )
            }
        </Carousel>

        <h2>Our Vegetarian & Vegan Delights</h2>
        <Carousel>
            {
                this.state.veggieAndVeganData.map( recipeData => <Recipe key= {recipeData._id} recipeData = { recipeData } /> )
            }
        </Carousel>

        <h2>Explore Our Categories</h2>
        <Carousel>
        {
                this.state.categoriesData.map( categoryData => <Category key= {categoryData._id} categoryData = { categoryData } /> )
            }
        </Carousel>

    </div>
    }
}

export default Home;
