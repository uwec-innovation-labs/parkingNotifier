import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import AppNavbar from "./AppNavbar";

class Unsubscribe extends Component {
  render() {
    return (
      <div className="navbar-offset">
        <AppNavbar />
        <div className="container content">
          <h2>Don't want to receive updates anymore?</h2>
          <h4>No problem.</h4>
          <h6>Just use the info that you signed up with.</h6>
        </div>
        <Form>
          <FormGroup>
            <Label>Phone Number</Label>
            <InputMask
              mask="999-999-9999"
              type="tel"
              className="form-control"
              required
              id="phoneNumber"
            />
          </FormGroup>
          <FormGroup>
            <Label>UWEC Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="username@uwec.edu"
              required
              autoComplete="email"
            />
          </FormGroup>
          <Button outline block color="primary" type="submit">
            Unsubscribe
          </Button>
        </Form>
      </div>
    );
  }
}

export default Unsubscribe;
