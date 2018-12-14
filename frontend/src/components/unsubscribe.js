import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import AppNavbar from "./AppNavbar";

class Unsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      formValid: true,
      emailValid: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
    this.validateEmail(e.target.value);
  };

  handleSubmit = event => {
    if (!this.validateEmail(this.state.email)) {
      console.log("incorrect email");
      return;
    }
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

  validateEmail = value => {
    if (value.length > 0 && /@uwec.edu\s*$/.test(value)) {
      this.setState({ emailValid: true });
    } else {
      this.setState({ emailValid: false });
    }
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
              invalid={!!!this.state.emailValid}
            />
            <FormFeedback>Must be a valid UWEC email.</FormFeedback>
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
