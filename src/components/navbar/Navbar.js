import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logos/micronic.png'

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary"
      >
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src={logo}
              alt="ceti logo"
              width="60"
              height="60"
            />
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/"}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to={"/info"}>Información</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link fs-5" to={"/form"}>Contacto</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link fs-5" to={"/foro"}>Foro</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link fs-5" to={"/servicios/login"}>Servicios</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link fs-5" to={"/manuales"}>Manuales</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
