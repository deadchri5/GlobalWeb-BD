import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Componentes
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Forbidden from './components/forbidden/Forbidden';
import Index from "./components/index/Index";
import Form from "./components/form/Form";
import AboutUs from './components/aboutUs/AboutUs';
import Foro from './components/foro/Foro';
import Login from './components/servicios/login/Login';
import Register from './components/servicios/register/Register';
import ServicesNav from './components/servicios/servicesNav/ServicesNav';
import Dashboard from './components/servicios/dashboard/Dashboard';
import Manuales from './components/manuales/Manuales';

export default class Routes extends Component {
    render() {
        return(
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Index}></Route>
                    <Route exact path="/form" component={Form}></Route>
                    <Route exact path="/info" component={AboutUs}></Route>
                    <Route exact path="/foro" component={Foro}></Route>
                    <Route exact path="/manuales" component={Manuales}></Route>
                    <Route exact path="/forbidden" component={Forbidden}></Route>
                    <Route exact path="/servicios" component={ServicesNav}></Route>
                    <Route exact path="/servicios/login" component={Login}></Route>
                    <Route exact path="/servicios/register" component={Register}></Route>
                    <Route exact path="/servicios/dashboard" component={Dashboard}></Route>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}