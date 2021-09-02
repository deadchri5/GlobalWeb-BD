import React, { Component } from "react";
import './styles.css';
import setup from '../../assets/images/setup.jpg'
import disipadores from '../../assets/images/disipadores.jpeg'
import grafica from '../../assets/images/gforce.jpg'

export default class index extends Component {
  render() {
    return (
      <div className="container-lg center">
        <div className="container-sm carousel-container">
          <h1 id="h1-title">Bytes store</h1>
          <p className="sub-title">Equipos de computo, componentes y perifericos</p>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={setup}
                  className="d-block w-100 carousel-height"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block carousel-canvas">
                  <h5 className="carousel-title">Arma tu setup</h5>
                  <p>
                    Contamos con toda clase de componentes, perifericos y
                    accesorios de todas las gamas, para tu espacio de trabajo
                    perfecto.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={grafica}
                  className="d-block w-100 carousel-height"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block carousel-canvas">
                  <h5 className="carousel-title">
                    Tarjetas gráficas de alto rendimiento
                  </h5>
                  <p>
                    Gran variedad de tarjetas de video dedicadas para tu equipo
                    profesional o entretenimiento.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={disipadores}
                  className="d-block w-100 carousel-height"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block carousel-canvas">
                  <h5 className="carousel-title">Disipadores</h5>
                  <p>
                    Disipadores para que tu pc nunca se sobrecaliente y trabaje
                    a sus temperaturas optimas.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
