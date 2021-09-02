import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contraseña: '',
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanges(event) {
        if (event.target.id === 'user-name') {
            this.setState({usuario: event.target.value});
        }
        else {
            this.setState({contraseña: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/login', {
          'nick': this.state.usuario,
          'password': this.state.contraseña,
        }, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.props.history.push('/servicios/dashboard');
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: error.response.data.status,
            text: error.response.data.message,
          })
        })
    }

    componentDidMount() {
      axios.get('http://localhost:4000/sessionInfo', { withCredentials: true })
      .then(response => {
        if(response.data.payload) {
          this.props.history.push('/servicios/dashboard');
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    }

  render() {
    return (
      <div className="container-lg">
        <div className="container-center">
            <h2>Inicia sesión con tu cuenta</h2>
            <div className="card login-card">
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="user" 
                        className="form-label">
                  Usuario
                </label>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="user-name"
                    placeholder="nombre de usuario"
                    value={this.state.usuario}
                    onChange={this.handleChanges}
                />
                <label htmlFor="floatingInput">Usuario</label>
                </div>
                <label  htmlFor="password" 
                        className="form-label">
                  Contraseña
                </label>
                <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="user-password"
                    placeholder="Password"
                    value={this.state.contraseña}
                    onChange={this.handleChanges}
                />
                <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </form>
                <div className="no-account-container">
                    <p className="no-account-container__text">¿No tienes una cuenta?</p>
                    <Link to={"/servicios/register"}>Registrarme</Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
