import React, { Component } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Swal from 'sweetalert2';
import noPhoto from '../../../../../../assets/images/noPhoto.png';
import './styles.css'

export default class Card extends Component {

    agregarAlCarrito(event) {
        const productID = event.target.value;

        axios.post('http://localhost:4000/addToCart', {
            'ID': productID
        }, 
        { withCredentials: true })
        .then(response => {
            Swal.fire(
                response.data.message
            );
        })
        .catch(error => {
            Swal.fire(
                error.response.data.message
            );
        })
    }

    render() {

        const image = <img  src={`http://localhost:4000/productImage/${this.props.data.imagen}`} 
                            className="card-img-top card-img" 
                            alt={this.props.data.nombre}/>;

        const noImage = <img    src={noPhoto} 
                                className="card-img-top card-img" 
                                alt={this.props.data.nombre}/> 

        return(
            <div className="card card-product">
                { this.props.data.imagen !== null ?  image : noImage }
                    <hr className="hr-card"/>
                    <div className="card-body card-product-body">
                        <h5 className="card-title card-product-title">{this.props.data.nombre}</h5>
                        <span className="badge bg-success">
                            <NumberFormat   value={this.props.data.precio} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            prefix={'$'}/> MXN
                        </span>
                        <p className="card-text card-product-text">{this.props.data.descripcion}</p>
                        <button className="btn btn-primary"
                                onClick={this.agregarAlCarrito}
                                value={this.props.data.ID}>
                            Agregar a carrito
                        </button>
                    </div>
                </div>
        );
    }
}