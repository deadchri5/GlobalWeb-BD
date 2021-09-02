import React, { Component } from 'react';
import axios from 'axios';
import './styles.css'

export default class Perfil extends Component {

    constructor(props){
        super(props);
        this.state={
            userName: '',
            email: '',
            calle: '',
            numero: '',
            CP: '',
            colonia: '',
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/sessionInfo', { withCredentials: true })
        .then(response => {
            const { usuario, correo } = response.data.payload;
            this.setState({
                userName: usuario,
                email: correo
            });
        })
        .catch(error => {
            console.log(error.response);
        });

        axios.get('http://localhost:4000/getAddress', { withCredentials: true })
        .then(response => {
            const { direccion } = response.data;
            if (direccion) {
                this.setState({
                    calle: direccion.calle,
                    numero: direccion.numero,
                    CP: direccion.cp,
                    colonia: direccion.colonia
                });
            }
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    handleChanges(event) {
        switch(event.target.id) {
            case 'userName':
                this.setState({userName: event.target.value});
                break;
            case 'userEmail':
                this.setState({email: event.target.value});
                break;
            case 'userAdress':
                this.setState({calle: event.target.value});
                break;
            case 'userHouseNumber':
                this.setState({numero: event.target.value});
                break;
            case 'userCP':
                this.setState({CP: event.target.value});
                break;
            case 'userColonia':
                this.setState({colonia: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    render() {
        return(
            <section className="profile-container">
                <h2 className="profile-h2">Mi Cuenta</h2>
                <div className="card card-profile">
                    <form onSubmit={this.handleSubmit}>
                    <p className="h3 form-datos">Cuenta</p>
                        <div className="form-group has-success">
                            <label  className="form-label mt-4" 
                                    htmlFor="userName">
                                Nombre de usuario
                            </label>
                            <input  type="text"
                                    placeholder="Ingresa tu nombre de usuario"
                                    value={this.state.userName} 
                                    onChange={this.handleChanges}
                                    className="form-control is-valid" 
                                    id="userName"/>
                            <div className="valid-feedback">
                                Este nombre de usuario esta disponible
                            </div>
                        </div>

                        <div className="form-group has-danger">
                            <label  className="form-label mt-4" 
                                    htmlFor="userEmail">
                                Correo electronico
                            </label>
                            <input  type="email" 
                                    placeholder="Ingresa tu dirección de correo"
                                    value={this.state.email}
                                    onChange={this.handleChanges}
                                    className="form-control is-invalid" 
                                    id="userEmail"/>
                            <div className="invalid-feedback">
                                Esta dirección de correo eléctronico ya esta en uso
                            </div>
                        </div>

                        <p className="h3 form-h3">Domicilio</p>

                        <div className="form-group">
                            <label  className="form-label mt-4" 
                                    htmlFor="userAdress">
                                Calle
                            </label>
                            <input  type="text" 
                                    placeholder="Calle"
                                    value={this.state.calle}
                                    onChange={this.handleChanges}
                                    className="form-control" 
                                    id="userAdress"/>
                        </div>

                        <div className="form-group">
                            <label  className="form-label mt-4" 
                                    htmlFor="userHouseNumber">
                                Número de casa
                            </label>
                            <input  type="text" 
                                    placeholder="Número exterior de domicilio"
                                    value={this.state.numero}
                                    onChange={this.handleChanges}
                                    className="form-control" 
                                    id="userHouseNumber"/>
                        </div>

                        <div className="form-group">
                            <label  className="form-label mt-4" 
                                    htmlFor="userCP">
                                Código postal
                            </label>
                            <input  type="number" 
                                    placeholder="Código postal"
                                    value={this.state.CP}
                                    onChange={this.handleChanges}
                                    className="form-control" 
                                    id="userCP"/>
                        </div>

                        <div className="form-group">
                            <label  className="form-label mt-4" 
                                    htmlFor="userColonia">
                                Colonia
                            </label>
                            <input  type="text" 
                                    placeholder="Colonia"
                                    value={this.state.colonia}
                                    onChange={this.handleChanges}
                                    className="form-control" 
                                    id="userColonia"/>
                        </div>

                        <p className="h3 form-h3">Dar de Baja</p>
                        <div className="form-group d-grid gap-2">
                            <button type="button" 
                                    className="btn btn-danger">
                                Eliminar mi cuenta.
                            </button>
                        </div>

                        <div className="form-group form-user-btn">
                            <button type="submit" 
                                    className="btn btn-primary">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}