import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Button } from "react-bootstrap";
import "reactstrap";

class Register extends Component {
  render() {
    return (
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
              onChange={this.handleChange}
            />
          </div>
          <Button block type="submit" className="btn-primary" bsSize="large">
            Register
          </Button>
        </form>
      </div>
    );
  }
}
export default Register;
