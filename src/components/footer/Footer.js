import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/micronic.png";
import './styles.css'

export default class Footer extends Component {
  render() {
    return (
      <div className="container-fluid footer">
        <div className="container-sm">
          <footer className="row row-cols-5 py-5 my-5 border-top">
            <div className="col">
              <a
                href="/"
                className="
              d-flexorm.html?#
              align-items-center
              mb-3
              link-dark
              text-decoration-none
            "
              >
                <img src={logo} alt="ceti logo" width="100px" height="100px" />
              </a>
              <p className="text-muted">&copy; 2021 Chirstian Ochoa</p>
            </div>

            <div className="col"></div>

            <div className="col">
              <h5 className="footer-title">Mapa del sitio</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-muted footer-hover" to={"/"}>Inicio</Link>
                </li>
                <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-muted footer-hover" to={"/info"}>Información</Link>
                </li>
                <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-muted footer-hover" to={"/form"}>Contacto</Link>
                </li>
                <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-muted footer-hover" to={"/foro"}>Foro</Link>
                </li>
                <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-muted footer-hover" to={"/servicios/login"}>Servicios</Link>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
