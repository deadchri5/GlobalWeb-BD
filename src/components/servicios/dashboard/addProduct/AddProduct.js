import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './styles.css';

export default class AddProduct extends Component{


    constructor() {
        super();
        this.state = {
            nombre: '',
            marca: '',
            categoria: '',
            precio: 0,
            descricion: '',
            imagen: null,
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    handleChanges(event) {
        switch(event.target.id) {
            case 'productName':
                this.setState({nombre: event.target.value});
                break;
            case 'productTrade':
                this.setState({marca: event.target.value});
                break;
            case 'productCategory':
                this.setState({categoria: event.target.value});
                break;
            case 'productPrice':
                this.setState({precio: event.target.value});
                break;
            case 'productDescription':
                this.setState({descricion: event.target.value});
                break;
            default:
                break;
        }
    }

    onFileChange(event) {
        this.setState({imagen: event.target.files[0]});
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();

        formData.append('nombre', this.state.nombre);
        formData.append('marca', this.state.marca);
        formData.append('categoria', this.state.categoria);
        formData.append('precio', this.state.precio);
        formData.append('descripcion', this.state.descricion);
        formData.append('file0', this.state.imagen);

        axios.post('http://localhost:4000/uploadProduct', formData, { withCredentials: true })
        .then(response => {
            Swal.fire({
                title: 'El producto se agrego con éxito',
                text: response.data.message,
              })
        })
        .catch(error => {
            Swal.fire({
                title: 'Error al agregar producto',
                text: error.response.data.note,
              })
        });
    }

    render(){
        return(
            <div className="add-product-container">
                <h3 className="add-p-title">Agrega un producto</h3>
                <div className="card card-add">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-3">
                            <label  htmlFor="productName" 
                                    className="form-label">
                                Nombre
                            </label>
                            <input  type="text" 
                                    className="form-control" 
                                    placeholder="Nombre del producto"
                                    id="productName"
                                    value={this.state.nombre}
                                    onChange={this.handleChanges}/>
                        </div>
                        <div className="form-group mb-3">
                            <label  htmlFor="productTrade" 
                                    className="form-label">
                                Marca
                            </label>
                            <input  type="text" 
                                    className="form-control" 
                                    placeholder="Marca del producto"
                                    id="productTrade"
                                    value={this.state.marca}
                                    onChange={this.handleChanges}/>
                        </div>
                        <div className="form-group mb-3">
                            <label  htmlFor="productTrade" 
                                    className="form-label">
                                Categoria
                            </label>
                            <select className="form-select" 
                                    id="productCategory"
                                    value={this.state.categoria}
                                    onChange={this.handleChanges}>
                                <option defaultValue>Selecciona una categoria</option>
                                <option value="1">Equipos</option>
                                <option value="2">Graficas</option>
                                <option value="3">Procesadores</option>
                                <option value="4">Disipadores</option>
                                <option value="5">RAM</option>
                                <option value="6">Perifericos</option>
                                <option value="7">Fuentes</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label  htmlFor="productPrice" 
                                    className="form-label">
                                Precio
                            </label>
                            <input  type="number" 
                                    className="form-control" 
                                    placeholder="Precio del producto"
                                    id="productPrice"
                                    value={this.state.precio}
                                    onChange={this.handleChanges}/>
                        </div>
                        <div className="form-group mb-3">
                            <label  htmlFor="productDescription" 
                                    className="form-label">
                                Descripción
                            </label>
                            <textarea   type="text" 
                                        maxLength="255"
                                        className="form-control" 
                                        placeholder="Precio del producto"
                                        id="productDescription"
                                        value={this.state.descricion}
                                        onChange={this.handleChanges}
                                        />
                        </div>
                        <div className="form-group mb-3">
                            <label  htmlFor="prodctImage" 
                                    className="form-label">
                                Imagen
                            </label>
                            <input  className="form-control" 
                                    type="file" 
                                    id="prodctImage"
                                    onChange={this.onFileChange}/>
                        </div>
                        <div className="form-group mb-3 mt-3 btn-add-p">
                            <button type="submit"
                                    className="btn btn-primary">
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}