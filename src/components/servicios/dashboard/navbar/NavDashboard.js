import React, { Component } from 'react';
import './styles.css'

export default class NavDashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            busqueda: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({busqueda: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchParameter(this.state.busqueda);
    }

    render(){
        return(
            <section className="dashboard-navbar">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Equipos
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Gráficas
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Procesadores
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Disipadores
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    RAM
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Placas
                                </span>
                                </li>
                                <li className="nav-item">
                                <span   className="nav-link span-link" 
                                        aria-current="page"
                                        onClick={this.props.category}>
                                    Fuentes
                                </span>
                                </li>
                            </ul>
                        </div>
                        <form className="d-flex" onSubmit={this.handleSubmit}>
                            <input  className="form-control me-2" 
                                    type="search" 
                                    placeholder="Buscar un artículo" 
                                    aria-label="Search"
                                    value={this.state.busqueda}
                                    onChange={this.handleChange}
                            />
                            <button className="btn btn-outline-info" 
                                    type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </nav>
            </section>
        );
    }
}