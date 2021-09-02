import React, { Component } from 'react';
import './styles.css'

import NavDashboard from '../navbar/NavDashboard';
import Catalogo from './catalogo/Catalogo';

export default class Store extends Component {

    constructor() {
        super();
        this.state = {
            categoria: '',
            busqueda: '',
        };

        this.GetCategory = this.GetCategory.bind(this);
        this.GetSearchParameter = this.GetSearchParameter.bind(this);
    }

    GetCategory(e) {
        this.setState({categoria: e.target.innerHTML});
    }

    GetSearchParameter(searchString) {
        this.setState({busqueda: searchString});
    }
    
    render() {
        return(
            <div>
                <NavDashboard   category={this.GetCategory}
                                searchParameter={this.GetSearchParameter}/>
                <h2 className="store-h2">
                    {this.state.categoria === '' ? 'Tienda' : this.state.categoria}
                </h2>
                <Catalogo   categoria={this.state.categoria}
                            busqueda={this.state.busqueda}/>
            </div>
        );
    }
}