import React, { Component } from 'react';
import axios from 'axios';
import './styles.css'

import Card from './card/Card';

export default class Catalogo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productos: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/obtenerCatalogo')
        .then(response => {
            const { productos } = response.data;
            console.log(productos);
            this.setState({productos: productos});
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidUpdate(){
        if(this.props.busqueda !== '') {
            axios.get(`http://localhost:4000/obtenerCatalogo?busqueda=${this.props.busqueda}`)
            .then(response => {
                const { productos } = response.data;
                this.setState({productos: productos});
            })
            .catch(error => {
                console.log(error);
            })
            return;
        }
        if(this.props.categoria !== ''){
            var categoria = this.obtenerCategoiria(this.props.categoria);
            axios.get(`http://localhost:4000/obtenerCatalogo?categoria=${categoria}`)
            .then(response => {
                const { productos } = response.data;
                this.setState({productos: productos});
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    obtenerCategoiria(categoria) {
        switch(categoria) {
            case 'Equipos': 
                return 1;
            case 'Gráficas':
                return 2;
            case 'Procesadores':
                return 3;
            case 'Disipadores':
                return 4;
            case 'RAM':
                return 5;
            case 'Placas':
                return 6;
            case 'Fuentes':
                return 7;
            default:
                return 1;
        }
    }

    render() {
        return(
            <div className="container-sm">
                <div className="container-wrap">
                    {this.state.productos.map((producto, i) => (
                        <Card key={i} data={producto}/>
                    ))}
                </div>
            </div>
        );
    }
}