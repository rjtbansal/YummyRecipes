import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './UploadRecipes.scss';
import { Redirect } from 'react-router-dom';


export default class UploadRecipes extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            uploadRecipesFormData: {},
            selectedFile: null,
            redirect : null,
        };
    }
   
    uploadRecipe = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        for(const key in this.state.uploadRecipesFormData){
            formData.append(key, this.state.uploadRecipesFormData[key]);
        }
        axios.post(`http://localhost:3000/recipes`, formData, {})
             .then(res =>  {
                 alert(res.data);
                 this.setState({
                     redirect: "/uploaded-recipes"
                 });
             })
             .catch(err => console.error(err));
    }

    onChangeImageHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    handleChange = e => {
        e.preventDefault();
        this.handleInputChange(e.target.name, e.target.value);
    }

    handleInputChange = (key, value) => {

        this.setState({
            uploadRecipesFormData: {
                _id: uuidv4(),
                ...this.state.uploadRecipesFormData,
                addedBy: 'guest',
                [key]: value
            }
        });
    }

    submitRecipe = e => {
        e.preventDefault();
        this.uploadRecipe();
    }

    render()   {

        if(this.state.redirect) {
            return <Redirect to= {this.state.redirect} />
        }
        return <div className="upload-recipes">
            <h2 className="upload-recipes__title">
                Share Your Culinary Art
            </h2>
            <form method="post" onSubmit = {
                e =>  this.submitRecipe(e) 
            }>

                <div className="upload-recipes__inputsdiv">
                    <div className="upload-recipes__subdiv">
                        <label className="upload-recipes__label" htmlFor="name">Recipe Name *</label>
                        <input className="upload-recipes__input" name="name" onInput = { e => { this.handleChange(e)}} required />
                    </div>
                    <div className="upload-recipes__subdiv">
                        <label className="upload-recipes__label" htmlFor="cuisine">Cuisine</label>
                        <input className="upload-recipes__input" name="cuisine" onInput = { e => { this.handleChange(e)}}/>
                    </div>
                </div>

                <div className="upload-recipes__textareadiv">
                    <div>
                        <label className="upload-recipes__label" htmlFor="ingredients" required>Ingredients*</label> <br />
                        <textarea className="upload-recipes__textarea" name="ingredients" rows='10' columns='50' placeholder="Ingredients separated by commas" onInput = { e => { this.handleChange(e)}}/>
                    </div>
                    <div>
                        <label className="upload-recipes__label" htmlFor="instructions">Instructions *</label> <br />
                        <textarea className="upload-recipes__textarea" name="instructions" rows='10' columns='50' placeholder="How do we cook this recipe?" onInput = { e => { this.handleChange(e)}} required/>
                    </div>
                </div>
                <div className="upload-recipes__uploaddiv">
                    <label className="upload-recipes__label" htmlFor="image">Choose your recipe image:</label>
                    <input type="file" name="file" onChange= { e => {this.onChangeImageHandler(e)} } />
                </div>
                <div className="upload-recipes__buttons">
                    <button type="submit" className="upload-recipes--upload upload-recipes__button">UPLOAD</button>
                    <button type="reset" className="upload-recipes--reset upload-recipes__button">RESET</button>
                </div>
            </form>
        </div>
    }
}

