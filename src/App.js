import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'reactstrap';
const axios = require('axios')

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        phoneNumber: "",
        username: "",
        data: []
      };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/users')
    .then(res => {
      console.log(res.data)
      console.log(res.data[0])
      this.setState({
        data: [...res.data]
      })
      console.log(this.state)
    })
    
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
     axios.post(`http://localhost:9000/users/${this.state.username}`, {
       params: {
         firstName: this.state.name,
         phoneNumber: this.state.phoneNumber,
         username: this.state.username
       }
     })
     .then(res => {
       console.log(res)
     })
     .catch(err => {
       console.log(err)
     })
  }

  render() {
    const listData = this.state.data.map(item => <div>
        <ul>
          <li>{item.firstName + " " + item.lastName}</li>
          <li>{item.phone}</li>
          <li>{item.username}</li>
        </ul>
      </div>);
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

          {listData}

          </div>
    );
  }
}

export default App;
