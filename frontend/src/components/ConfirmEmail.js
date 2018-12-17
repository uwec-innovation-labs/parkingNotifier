import React, { Component } from "react";
import { Container, Alert } from "reactstrap";
import AppNavbar from "./AppNavbar";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    fetch(
      "http://api.parkingnotifier.com/confirmation/" +
        this.props.match.params.code,
      {
        method: "POST"
      }
    )
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          this.setState({
            confirmed: false,
            message: "It looks like you've already confirmed your code",
            color: "info"
          });
        } else {
          this.setState({
            confirmed: true,
            message:
              "Your email is confirmed. You are now subscribed to the Parking Notifier",
            color: "success"
          });
        }
      });
  };

  render() {
    return (
      <div>
        <AppNavbar />
        <div className="container navbar-offset" />
        <Container>
          <Alert color={this.state.color}>{this.state.message}</Alert>
        </Container>
      </div>
    );
  }
}

export default ConfirmEmail;
