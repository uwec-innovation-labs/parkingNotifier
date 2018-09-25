import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'reactstrap';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        phoneNumber: "",
        email: ""
      };
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.phoneNumber.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
     event.preventDefault();
  }

  render() {
    return (
    <div className="App p-3 mb-2 bg-light text-dark">
    <div className="content">
    <img src={require('./studentsenate_logo.png')} class="img-responsive" id="StudentSenateLogo" alt="StudentSenateLogo"/>
    </div>
      <div className="container">
        <h3> UWEC Parking Notifier Sign-up </h3>
        <p> During a snow emergency, the City of Eau Claire
        will activate alternate side parking rules. Complete
        the form below to sign up for text alerts when alternate
        side parking is in effect. </p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlID="name" bsSize="large">
            <ControlLabel> Name </ControlLabel>
            <FormControl
              id="name"
              autoFocus
              type="text"
              onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlID="phoneNumber" bsSize="large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              id="phoneNumber"
              onChange={this.handleChange}
              type="tel"
            />
          </FormGroup>
          <FormGroup controlID="email" bsSize="large">
            <ControlLabel>UWEC Email</ControlLabel>
            <FormControl
              id="email"
              onChange={this.handleChange}
              type="email"
            />
          </FormGroup>
          <Button
            block
            bsSize='medium'
            disabled={!this.validateForm()}
            type='submit'
          > Sign Up
          </Button>
          </form>
          </div>

          <footer>

          <small> This page is brought to you by the UWEC Student
          Student Senate and Information Technology Commission </small>
          </footer>

          </div>
    );
  }
}

export default App;
