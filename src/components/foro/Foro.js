import React, { Component } from "react";
import axios from 'axios';
import "./styles.css";

import ForoElement from "./foroElement/foroElement";

export default class Foro extends Component {


    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getComments')
        .then(response => {
            const { comments } = response.data;
            if (comments) {
                this.setState({comments: comments})
                console.log(comments);
            }
        })
        .catch(error => {
            console.log(error.response);
        })
    }

  render() {
    return (
      <section className="card foro">
        <h2 className="card-foro-title">Comentarios de la comunidad</h2>
        {
            this.state.comments.map((comment, i) => (
                <ForoElement key={i} datos={comment}/>
            ))
        }
      </section>
    );
  }
}
