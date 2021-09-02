import React, { Component } from "react";

export default class ServicesNav extends Component {
  render() {
    return (
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <span class="nav-link active" aria-current="page">
            Active
          </span>
        </li>
        <li class="nav-item">
          <span class="nav-link">
            Link
          </span>
        </li>
        <li class="nav-item">
          <span class="nav-link">
            Link
          </span>
        </li>
      </ul>
    );
  }
}
