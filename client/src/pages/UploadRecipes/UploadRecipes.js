import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class UploadRecipes extends React.Component {
    
    state = {
        uploadRecipesFormData: {}
    };

    uploadRecipe = () => {
        axios.post(`http://localhost:3000/recipes`, this.state.uploadRecipesFormData)
             .then(res => alert(res.data))
             .catch(err => console.error(err));
    }

    handleChange = e => {
        e.preventDefault();
        this.handleInputChange(e.target.name, e.target.value);
    }

    handleInputChange = (key, value) => {
        console.log([key], value);
        
        this.setState({
            uploadRecipesFormData: {
                _id: uuidv4(),
                ...this.state.uploadRecipesFormData,
                addedBy: 'guest',
                [key]: value
            }
        });
        console.log(this.state.uploadRecipesFormData)
    }

    submitRecipe = e => {
        e.preventDefault();
        this.uploadRecipe();
    }

    render()   {
        return <div>
            <h2>
                Share Your Culinary Art
            </h2>
            <form method="post" onSubmit = {
                e =>  this.submitRecipe(e) 
            }>
                <div>
                    <label htmlFor="name">Recipe Name *</label>
                    <input name="name" onInput = { e => { this.handleChange(e)}} required />
                </div>
                <div>
                    <label htmlFor="cuisine">Cuisine</label>
                    <input name="cuisine" onInput = { e => { this.handleChange(e)}}/>
                </div>
                <div>
                    <label htmlFor="ingredients" required>Ingredients & Portion Sizes *</label> <br />
                    <textarea name="ingredients" rows='10' columns='30' placeholder="Ingredients separated by commas, portions seperated by :" onInput = { e => { this.handleChange(e)}}/>
                </div>
                <div>
                    <label htmlFor="instructions">Instructions *</label> <br />
                    <textarea name="instructions" rows='10' columns='30' onInput = { e => { this.handleChange(e)}} required/>
                </div>
                <div>
                    <label htmlFor="image">Choose your recipe image:</label>
                    <input type="file" name="img" accept="image/*" />
                </div>
                <button>Reset</button>
                <button>Upload</button>
            </form>
        </div>
    }
}

