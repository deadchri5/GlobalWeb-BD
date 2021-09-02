import React, { Component } from "react";
import userImg from "../../../assets/images/anonymous.png";
import './styles.css'

export default class ForoElement extends Component {

    constructor(props){
        super(props);
        console.log(this.props.comentarios);
    }

  render() {
    return (
      <div>
        <div className="container-fluid mt-100" />
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">
                <div className="media flex-wrap w-100 align-items-center">
                  <img
                    src={userImg}
                    className="d-block ui-w-40 rounded-circle img-usuario-foro"
                    alt="imagen de usuario"
                  />
                  <div className="media-body ml-3">
                    <span data-abc="true">
                      {`${this.props.datos.nombre} ${this.props.datos.apellido}`}
                    </span>
                  </div>
                  <div class="text-muted small ml-3">
                    <div>
                      email: <strong>{this.props.datos.correo}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <p>
                    {this.props.datos.comentario}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
