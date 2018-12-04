import React, { Component } from "react";
import Register from "./Register";
import Unsubscribe from "./Unsubscribe";
import { Button } from "react-bootstrap";
import "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: ""
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      unsubscribe: !state.unsubscribe
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <img
            src={require("../clearwater_logo.png")}
            className="img-responsive"
            id="cwlLogo"
            alt="cwlLogo"
          />
        </div>
        <div className="container">
          <h3> Parking Notifier Sign-up </h3>
          <p>
            During a snow emergency, the City of Eau Claire will activate
            alternate side parking rules. Complete the form below to sign up for
            text alerts when alternate side parking is in effect.{" "}
          </p>
          {!this.state.unsubscribe ? <Register /> : <Unsubscribe />}
          <Button
            onClick={this.handleToggleClick}
            id="unsubscribeBtn"
            className="btn-secondary"
            bsSize="small"
            //            disabled={!this.validateForm()}
          >
            {this.state.unsubscribe ? "Register" : "Unsubscribe"}
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
