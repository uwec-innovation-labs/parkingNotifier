import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import studentSenateLogo from './studentsenate_logo.jpg';
import InputMask from 'react-input-mask';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        phoneNumber: ""
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


      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlID="name" bsSize="large">
            <ControlLabel> Name </ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlID="phoneNumber" bsSize="large">
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              type="text"
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
    );
  }
}

export default App;
