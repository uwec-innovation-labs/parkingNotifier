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
        <div className="row">
        <div className="col align-self-center padding-0">
        <h4> Be the first to know! </h4>
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
                <label htmlFor="email"> Email </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={this.handleChange}
                />
              </div>
              <Button block type="submit" className="btn-primary">
                Register
              </Button>
            </form>
          </div>
          </div>
          <div className="col">
            <img
              src={require("../demo_text.jpg")}
              className="img-responsive"
              id="demo_text"
              alt="Text Message Example"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
