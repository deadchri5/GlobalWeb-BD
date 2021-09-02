import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import './styles.css';

export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      usuario: "",
      email: "",
      nombre: "",
      apellido: "",
      passsword: "",
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChanges(event) {
    if (event.target.id === 'user-email') {
        this.setState({email: event.target.value});
    }
    else if (event.target.id === 'user-name') {
        this.setState({usuario: event.target.value});
    }
    else if (event.target.id === 'passsword') {
        this.setState({passsword: event.target.value});
    }
    else if (event.target.id === 'nombre') {
      this.setState({nombre: event.target.value});
    }
    else if (event.target.id === 'apellido') {
      this.setState({apellido: event.target.value});
    }
}

handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:4000/registro', {
      'nombre': this.state.nombre,
      'apellido': this.state.apellido,
      'email': this.state.email,
      'nick': this.state.usuario,
      'password': this.state.passsword
    })
    .then((response) => {
      const { status, message } = response.data;
      if (status === 'error') {
        var errors = response.data.validaciones;
        if (typeof(errors) != 'undefined' && errors != null) {
          errors.forEach(element => {
            if (element.param === 'email') {
              document.querySelector('.input-email').classList.add('is-invalid');
            }
            if (element.param === 'nick') {
              document.querySelector('.input-nick').classList.add('is-invalid');
            }
            if (element.param === 'nombre') {
              document.querySelector('.input-nombre').classList.add('is-invalid');
            }
            if (element.param === 'apellido') {
              document.querySelector('.input-apellido').classList.add('is-invalid');
            }
            if (element.param === 'password') {
              document.querySelector('.input-password').classList.add('is-invalid');
            }
          });
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar.',
          text: message,
        })
      }
      else {
        Swal.fire({ 
          position: 'center',
          icon: 'success',
          title: 'Registrado con exito.',
          text: response.data.nombre + ' creaste tu cuenta con exito.',
          showConfirmButton: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

  render() {
    return (
      <div className="container-lg">
        <div className="container-center">
          <h2>Crea una cuenta</h2>
          <div className="card login-card">
            <form onSubmit={this.handleSubmit}>

              <label htmlFor="email" className="form-label">
                Correo electronico
              </label>
              <div className="form-floating mb-1">
                <input
                  name="email"
                  type="email"
                  className="form-control input-email"
                  id="user-email"
                  placeholder="correo electronico"
                  value={this.state.email}
                  onChange={this.handleChanges}
                />
                <div className="invalid-feedback">
                  Correo en formato no valido.
                </div>
                <label htmlFor="floatingInput">Email</label>
              </div>

              <label htmlFor="nick" className="form-label">Nombre
                Usuario
              </label>
              <div className="form-floating mb-1">
                <input
                  name="nick"
                  type="text"
                  className="form-control input-nick"
                  id="user-name"
                  placeholder="nombre de usuario"
                  value={this.state.usuario}
                  onChange={this.handleChanges}
                />
                <div className="invalid-feedback">
                  Nombre de usuario debe tener al menos 2 cáracteres.
                </div>
                <label htmlFor="floatingInput">Usuario</label>
              </div>

              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <div className="form-floating mb-1">
                <input
                  name="nombre"
                  type="text"
                  className="form-control input-nombre"
                  id="nombre"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={this.handleChanges}
                />
                <div className="invalid-feedback">
                  Nombre solo puede contener letras.
                </div>
                <label htmlFor="floatingInput">Nombre</label>
              </div>

              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <div className="form-floating mb-1">
                <input
                  name="apellido"
                  type="text"
                  className="form-control input-apellido"
                  id="apellido"
                  placeholder="Apellido"
                  value={this.state.apellido}
                  onChange={this.handleChanges}
                />
                <div className="invalid-feedback">
                  Apellido solo puede contener letras.
                </div>
                <label htmlFor="floatingInput">Apellido</label>
              </div>

              <label htmlFor="clave" className="form-label">
                Contraseña
              </label>
              <div className="form-floating mb-1">
                <input
                  name="passsword"
                  type="password"
                  className="form-control input-password"
                  id="passsword"
                  placeholder="Contraseña"
                  value={this.state.passsword}
                  onChange={this.handleChanges}
                />
                <div className="invalid-feedback">
                  Contraseña no puede quedar vacía.
                </div>
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Crear cuenta
              </button>
            </form>
            <div className="no-account-container">
              <p className="no-account-container__text">¿Ya tienes cuenta?</p>
              <Link to={"/servicios/login"}>Inicia sesión</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
