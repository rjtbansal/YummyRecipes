import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Cuisines from './pages/Cuisines/Cuisines';
import UploadRecipes from './pages/UploadRecipes/UploadRecipes';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import CuisineDetails from './pages/CuisineDetails/CuisineDetails';

function App() {
  return (
          <BrowserRouter>
            <Header />
            <Switch>             
              <Route path='/home' component = { Home } />
              <Route path='/categories/:id' component = { CategoryDetails } />
              <Route path='/recipes/:id' component = { RecipeDetails } />
              <Route path='/categories' component = { Categories } />
              <Route path='/cuisines/:id' component = { CuisineDetails } />
              <Route path='/cuisines' component = { Cuisines } />
              <Route path='/upload' component = { UploadRecipes } />
              <Route exact path='/' component = { Home } />
            </Switch>
          </BrowserRouter>
  );
}

export default App;
