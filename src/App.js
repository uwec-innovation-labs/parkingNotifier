import React, { Component } from 'react';
import './App.css';
import { Button } from "react-bootstrap";
import 'reactstrap';
import InputMask from 'react-input-mask';


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
<div className="App">
    <div className="content">
    <img src={require('./studentsenate_logo.png')} className="img-responsive" id="StudentSenateLogo" alt="StudentSenateLogo"/>
    </div>
    <div className="container">
        <h3> UWEC Parking Notifier Sign-up </h3>
        <p> During a snow emergency, the City of Eau Claire
        will activate alternate side parking rules. Complete
        the form below to sign up for text alerts when alternate
        side parking is in effect. </p>

        <form onSubmit={this.handleSubmit}>
        <label for="name" id="nameLabel"> Name </label>
    <div className="form-group" id="firstAndLastName">
		  <input type="name" class="form-control" autoFocus id="firstName" placeHolder="First" onChange={this.handleChange}/>
		  <input type="name" class="form-control" id="lastName" placeHolder="Last" onChange={this.handleChange}/>
		</div>
		<div class="form-group">
			<label for="phoneNumber"> Phone Number </label>
			<input type="tel" class="form-control" id="phoneNumber"/>
		</div>
		<div class="form-group">
			<label for="email"> UWEC Email </label>
			<input type="email" class="form-control" id="email"/>
    </div>
      <Button block type="submit" bsSize="large" disabled={!this.validateForm()}> Submit </Button>

    </form>
    </div>

          <footer>

          <small> This page is brought to you by the UWEC
          Student Senate and Information Technology Commission </small>
          </footer>

          </div>
    );
  }
}

export default App;
