import React from 'react';
import './Cuisines.scss';
import Cuisine from '../../components/Cuisine/Cuisine';
import axios from 'axios';

export default class Cuisines extends React.Component {
   
    state = {
        cuisinesData: []
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

    componentDidMount() {
        this.getCuisines();
    }

    render() {
        return(
            <div className="cuisines">
                {
                    this.state.cuisinesData.map(cuisineData => <Cuisine key={cuisineData._id} cuisineData={cuisineData} />)
                }
            </div>
        )
    }


}

