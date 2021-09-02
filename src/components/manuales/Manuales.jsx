import React, { Component } from 'react';
import './styles.css';
import manualUsuario from '../../assets/manuales/20110469_Manual_De_Usuario.pdf';
import manualTecnico from '../../assets/manuales/20110469_Manual_Tecnico.pdf';

export default class Manuales extends Component {

    openPDF(event) {
        if (event.target.value === 'usuario') {
            window.open(manualUsuario);
        } else {
            window.open(manualTecnico);
        }
        return false;
    }

    render() {
        return(
            <section className="manuales-container">
                <h1 className="col-white">Manuales</h1>
                <div className="card manuales-card">
                    <div className="card-container-manual">
                        <div className="manual-element">
                            <p>Ver manual de usuario</p>
                            <button className="btn btn-primary"
                                    value="usuario"
                                    onClick={this.openPDF}>
                                Manual de usuario
                            </button>
                        </div>
                        <div className="manual-element">
                            <p>Ver manual técnico</p>
                            <button className="btn btn-primary"
                                    value="tecnico"
                                    onClick={this.openPDF}>
                                Manual técnico
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}