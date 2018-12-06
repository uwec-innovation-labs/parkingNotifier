import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Button } from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AppNavbar />
      <div className=".container-fluid">
        <div className="row">
        <div className="col align-self-center">
        <img
          src={require("../clearwater_logo.png")}
          className="clearwater_logo_register"
          id="clearwater_logo_register"
          alt="Clearwater Labs"
        />
        <p className="register">
        When you register with the Parking Notifier, you will receive a text message when alternate side parking takes effect.
        It'll tell you which side of the street to park on and when the rules will end (3 days after the start of the rules).
        </p>
          <div className="registerForm">
            <form>
              <label htmlFor="name" id="nameLabel">
                Name
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
                  placeholder="username@uwec.edu"
                  onChange={this.handleChange}
                />
              </div>
              <Button block type="submit" className="btn-primary">
                Register
              </Button>
            </form>
          </div>
          </div>
          <div className="col align-self-center">
            <img
              src={require("../demo_text.jpg")}
              className="text-example-img"
              id="demo_text"
              alt="Text Message Example"
            />
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default Register;
