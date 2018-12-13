import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import AppNavbar from "./AppNavbar";

class Unsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      formValid: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:80/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    });
    this.setState({
      formValid: true
    });
    console.log("SUBMIT");
  };

  render() {
    return (
      <div className="navbar-offset">
        <AppNavbar />
        <div className="container content">
          <h2>Don't want to receive updates anymore?</h2>
          <h4>No problem.</h4>
          <h6>Just use the info that you signed up with.</h6>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>UWEC Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="username@uwec.edu"
              required
              autoComplete="email"
              value={this.state.email}
              onChange={event => this.handleInput(event)}
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
