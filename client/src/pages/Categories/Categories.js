import React from 'react';
import axios from 'axios';
import Category from '../../components/Category/Category';
import './Categories.scss';

class Categories extends React.Component {

    state = {
        categoriesData: []
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

    componentDidMount(){
        this.getCategories();
    }

    render(){
        return( 
            <div>   
                <div className="categories">          
                    {
                        this.state.categoriesData.map(categoryData => <Category key={categoryData._id} categoryData={categoryData} /> ) 
                    }
                </div>
            </div>
        )
    }
}

export default Categories;
