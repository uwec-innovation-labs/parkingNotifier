import React, { Component } from "react";
import "./App.css";
import InputMask from "react-input-mask";
import { Button } from "react-bootstrap";
import "reactstrap";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      email: "",
      firstName: "",
      lastName: "",
      data: []
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.phoneNumber.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    axios
      .post(`http://localhost:9000/users`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.email,
        phoneNumber: this.state.phoneNumber
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="content">
          <img
            src={require("./studentsenate_logo.png")}
            className="img-responsive"
            id="StudentSenateLogo"
            alt="StudentSenateLogo"
          />
        </div>
        <div className="container">
          <h3> Parking Notifier Sign-up </h3>
          <p>
            {" "}
            During a snow emergency, the City of Eau Claire will activate
            alternate side parking rules. Complete the form below to sign up for
            text alerts when alternate side parking is in effect.{" "}
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name" id="nameLabel">
              {" "}
              Name{" "}
            </label>
            <div className="form-group" id="firstAndLastName">
              <input
                type="name"
                className="form-control"
                autoFocus
                id="firstName"
                placeholder="First"
                onChange={this.handleChange}
              />
              <input
                type="name"
                className="form-control"
                id="lastName"
                placeholder="Last"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber"> Phone Number </label>
              <InputMask
                mask="999-999-9999"
                type="tel"
                className="form-control"
                id="phoneNumber"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"> UWEC Email </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
              />
            </div>
            <Button
              block
              type="submit"
              className="btn-primary"
              bsSize="large"
              disabled={!this.validateForm()}
            >
              {" "}
              Submit{" "}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
