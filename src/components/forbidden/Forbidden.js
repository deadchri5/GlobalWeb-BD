import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logos/micronic.png';
export default class Forbidden extends Component {
    render() {
        return(
            <div className="forbidden-container">
                <section className="card card-forbidden">
                    <p className="h5">No tienes permiso para ver el recuso.</p>
                    <div className="card-forbidden-actions-container">
                        <img className="app-logo" alt="app-logo" src={logo}/>
                        <div className="card-options">
                            <p className="h6 c-b">Acciones recomendadas.</p>
                            <Link   className="nav-link fs-5 card-forbidden-link" 
                                    to={"/servicios/login"}>
                                Iniciar sesión
                            </Link>
                            <Link   className="nav-link fs-5 card-forbidden-link" 
                                    to={"/servicios/register"}>
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}