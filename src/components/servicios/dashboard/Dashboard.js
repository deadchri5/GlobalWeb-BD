import React, { Component } from 'react';
import Swal from 'sweetalert2';
import './styles.css'
import axios from 'axios';

//Sidebar
import Sidebar from './sidebar/Sidebar';
//User options
import Store from './store/Store';
import Perfil from './perfil/Perfil';
//Admin options
import AddProduct from './addProduct/AddProduct';
//Carrito de compras
import Carrito from './carrito/Carrito';

export default class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            screen: 'tienda',
            user: {}
        }
        this.handleScreenChange = this.handleScreenChange.bind(this);
    }

    handleScreenChange(event){
        this.setState({screen: event.target.value});
    }

    componentDidMount(){
        axios.get('http://localhost:4000/sessionInfo', { withCredentials: true })
        .then(response => {
            const { payload } = response.data;
            this.setState({user: payload})
            console.log(this.state.user);
        })
        .catch(error => {
            Swal.fire(error.response.data.message);
            this.props.history.push('/forbidden');
        })
    }

    render() {

        const renderScreen = () => {
            switch(this.state.screen) {
                case 'perfil':
                    return <Perfil/>;
                case 'tienda':
                    return <Store/>;
                case 'agregar':
                    return <AddProduct/>
                case 'carrito':
                return <Carrito/>
                default:
                    break;
            }
        }

        return(
                <div className="dashboard-container">
                    <Sidebar    screen={this.handleScreenChange}
                                user={this.state.user}/>
                    <section className="section-container">
                        { renderScreen() }
                    </section>
                </div>
        );
    }
}