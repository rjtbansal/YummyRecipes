import React, { Component } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Cuisine from '../../components/Cuisine/Cuisine';
import Category from '../../components/Category/Category';

import axios from 'axios';

class Home extends Component {

    state = {
        cuisinesData: [],
        categoriesData: []
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
                //console.log(categories.data);
                this.setState({
                    categoriesData: categories.data
                })
            })
            .catch(err => console.error(err));
    }

    

    componentDidMount(){
        this.getCuisines();
        this.getCategories();
    }

    render() {
    return <div>
        <h3>Today's Recipes</h3>
        {/* now call api and render data same as below */}
        <Carousel>
            <div>
                 <h3>Recipe1</h3>
            </div>
            <div>
                 <h3>Recipe2</h3>
            </div>
            <div>
                 <h3>Recipe3</h3>
            </div>
            <div>
                 <h3>Recipe4</h3>
            </div>
            <div>
                 <h3>Recipe5</h3>
            </div>
            <div>
                 <h3>Recipe6</h3>
            </div>
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
