import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./styles.css";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      nombre: "",
      apellido: "",
      mensaje: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case "inputEmail":
        this.setState({ email: event.target.value });
        break;
      case "inputName":
        this.setState({ nombre: event.target.value });
        break;
      case "inputLastName":
        this.setState({ apellido: event.target.value });
        break;
        case "floatingTextarea":
        this.setState({mensaje: event.target.value});
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:4000/postComment', {
      'nombre': this.state.nombre,
      'apellido': this.state.apellido,
      'correo': this.state.email,
      'comentario': this.state.mensaje
    })
    .then(response => {
      Swal.fire(
        response.data.message,
        'Tu comentario se publico en el foro!',
        'success'
      )
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  render() {
    return (
      <div className="container-lg">
        <p className="h1 form-title">Envia tus comentarios</p>
        <div className="container-sm form-container">
          <div className="card form-card">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo eléctronico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div id="emailHelp" className="form-text">
                  Ingresa tu correo para mandar el formulario.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
                <div id="namedHelp" className="form-text">
                  Ingresa tu nombre.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputLastName" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  value={this.state.apellido}
                  onChange={this.handleChange}
                />
                <div id="lastNameHelp" className="form-text">
                  Ingresa tu apellido.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputText" className="form-label">
                  Mensaje
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control txtarea"
                    placeholder="Deja tu manseaje"
                    value={this.state.mensaje}
                    onChange={this.handleChange}
                    id="floatingTextarea"
                  ></textarea>
                  <label htmlFor="floatingTextarea">Comentarios</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
