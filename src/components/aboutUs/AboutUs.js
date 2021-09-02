import React, { Component } from 'react';
import './styles.css';
import about from '../../assets/images/about.jpg'

export default class AboutUs extends Component{

    constructor(props){
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1
        }
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    }

    onDocumentLoadSuccess() {
        this.setState({numPages: this.state.numPages});
    }

    render(){
        return(
            <section className="about-us-container">
                <div className="card card__about-us">
                    <h2 className="title-about-us">Acerca de nosotros</h2>
                    <div className="about-info">
                        <div className="about-img">
                            <img src={about} alt="acerca de nosotros"/>
                        </div>
                        <div className="about-text-section">
                        <p>
                            Somos una página Méxicana con el objetivo de vender laptops 
                            y hardware para PC al menor costo posible.
                        </p>
                        <p>
                            Sitio web contruido en 2021 por <strong>Christian Yesael Ochoa Hernández</strong> cómo
                            parte de su exámen global de Desarrollo Web I.
                        </p>
                        <p>
                            Dentro de nuestra gama de productos encontrarás electrónica de consumo como 
                            son Procesadores, tarjetas de video, disipadores, laptops entre muchas cosas más.
                        </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}