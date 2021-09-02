import React, { Component } from 'react';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';
import {    IoCogSharp,
            IoStorefrontOutline,
            IoAddOutline,
            IoMan,
            IoCartOutline
} from 'react-icons/io5';
import './styles.css';

export default class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidUpdate(Oldprops) {
        if (Object.keys(Oldprops.user).length === 0) {
            this.setState({user: this.props.user});
        }
    }

    cerrarSesion() {
        axios.delete('http://localhost:4000/sessionRemove', { withCredentials: true })
        .then(response => {
            alert(response.data.message);
        })
        .catch(error => {
            alert(error.response.message);
        })
    }

    render() {
        const { nombre, permiso } = this.state.user;
        return(
            <aside className="d-flex flex-column flex-shrink-0 p-3 bg-light side-width">
                <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <IoCogSharp className="bi me-2" 
                            width="40" 
                            height="40"/>
                    <span className="fs-4">Mi panel</span>
                </span>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <UserOptions screen={this.props.screen}/>
                    {permiso === 2 ? <AdminOptions screen={this.props.screen}/> : null}
                </ul>
                <hr/>
                <div className="dropdown">
                    <span className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/deadchri5.png" alt="Imagen de perfil" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>{nombre}</strong>
                    </span>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li>
                            <button className="dropdown-item"
                                    onClick={this.cerrarSesion}>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

class UserOptions extends Component {

    render() {
        return(
            <div>
                    <li className="nav-item">
                        <button className="nav-link al-c btn-aside" 
                                current="page"
                                value="perfil"
                                onClick={this.props.screen}>
                            <FiUser className="bi me-2" 
                                    width="20" 
                                    height="20"/>
                            Mi perfil
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link al-c btn-aside" 
                                aria-current="page"
                                value="tienda"
                                onClick={this.props.screen}>
                            <IoStorefrontOutline className="bi me-2" 
                                                 width="20" 
                                                 height="20"/>
                            Tienda
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link al-c btn-aside" 
                                aria-current="page"
                                value="carrito"
                                onClick={this.props.screen}>
                            <IoCartOutline className="bi me-2" 
                                    width="20" 
                                    height="20"/>
                            Mi carrito
                        </button>
                    </li>
            </div>
        );
    }
}


class AdminOptions extends Component {
    render() {
        return(
            <div className="user-options">
                <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <IoMan className="bi me-2" 
                            width="40" 
                            height="40"/>
                    <span className="fs-4">Administración</span>
                </span>
                <hr/>
                    <li className="nav-item">
                        <button className="nav-link al-c btn-aside" 
                                aria-current="page"
                                onClick={this.props.screen}
                                value="agregar">
                            <IoAddOutline className="bi me-2" 
                                    width="20" 
                                    height="20"/>
                            Agregar articulo
                        </button>
                    </li>
            </div>
        );
    }
}