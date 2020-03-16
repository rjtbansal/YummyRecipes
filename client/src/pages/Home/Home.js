import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import axios from 'axios';
const Home = () => {

    

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
            <div>
                 <h3>Cuisine1</h3>
            </div>
            <div>
                 <h3>Cuisine2</h3>
            </div>
            <div>
                 <h3>Cuisine3</h3>
            </div>
            <div>
                 <h3>Cuisine4</h3>
            </div>
            <div>
                 <h3>Cuisine5</h3>
            </div>
            <div>
                 <h3>Cuisine6</h3>
            </div>
        </Carousel>

        <h3>Explore Our Categories</h3>
        <Carousel />
    </div>
}

export default Home;
