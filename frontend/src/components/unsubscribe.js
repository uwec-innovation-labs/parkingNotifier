import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Button } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

class Unsubscribe extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" id="username">
            <label htmlFor="username"> Email </label>
            <input
              type="name"
              className="form-control"
              autoFocus
              id="username"
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
          <Button block type="submit" className="btn-primary">
            Unsubscribe
          </Button>
        </form>
      </div>
    );
  }
}

export default Unsubscribe;
