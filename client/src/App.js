import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Cuisines from './pages/Cuisines/Cuisines';
import UploadRecipes from './pages/UploadRecipes/UploadRecipes';

function App() {
  return (
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path='/' component = { Home } />
              <Route path='/home' component = { Home } />
              <Route path='/categories' component = { Categories } />
              <Route path='/cuisines' component = { Cuisines } />
              <Route path='/upload' component = { UploadRecipes } />
            </Switch>
          </BrowserRouter>
  );
}

export default App;
