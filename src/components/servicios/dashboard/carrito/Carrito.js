import React, { Component } from "react";
import NumberFormat from 'react-number-format';
import Swal from "sweetalert2";
import axios from 'axios';
import './styles.css';

export default class Carrito extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
            PrecioTotal: 0,
            productos: [],
        }
        this.eliminar = this.eliminar.bind(this);
    }

    componentDidMount() {
        this.obtenerProductos();
    }

    obtenerProductos() {
        axios.get('http://localhost:4000/getShoppingCart', { withCredentials: true })
        .then(response => {
            if(response.data.productos) {
                this.setState({productos: response.data.productos, isEmpty: false});
                this.calcularTotal();
            } else {
                this.setState({isEmpty: true});
            }
        })
        .catch(error => {
            this.setState({isEmpty: true});
        })
    }

    calcularTotal() {
        var total = 0;
        this.state.productos.forEach(element => {
            total = total + (element.precio * element.cantidad);
            this.setState({PrecioTotal: total});
        });
    }

    eliminar(event) {
        const productID = event.target.value;
        axios.delete(`http://localhost:4000/deleteFromCArt/${productID}`, 
        { withCredentials: true })
        .then( () => {
              this.obtenerProductos();
        })
        .catch(error => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ocurrio un error',
                showConfirmButton: false,
                timer: 1500
              })
              this.obtenerProductos();
        })
    }

  render() {

    return (
      <section className="cart-container">
          <h2 className="carrito-title">Carrito de compras</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
                { this.state.productos.map((producto, i) => (
                    <tr>
                        <th scope="row" key={i}>{producto.nombre}</th>
                        <td className="text-strong">
                            <NumberFormat   value={producto.precio}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}/> MXN
                        </td>
                        <td className="text-strong">{producto.cantidad}</td>
                        <td className="text-strong">
                            <NumberFormat   value={producto.precio*producto.cantidad} 
                                            displayType={'text'} 
                                            thousandSeparator={true} 
                                            prefix={'$'}/> MXN
                        </td>
                        <td>
                            <button className="btn btn-danger" 
                                    value={producto.ID}
                                    onClick={this.eliminar}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                )) }
            </tbody>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Total</th>
                <th scope="col" className="text-strong">
                    <NumberFormat   value={this.state.PrecioTotal} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'}/> MXN
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
          </table>
        </div>
      </section>
    );
  }
}
