import React, { Component } from "react";
import AppNavbar from "./AppNavbar";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    console.log("Making the call");
    fetch("http://localhost:80/confirmation/" + this.props.match.params.code, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          this.setState({
            confirmed: false,
            message: "Incorrect code or you've already confirmed your code"
          });
        } else {
          this.setState({ confirmed: true });
        }
        console.log(this.state);
      });
  };

  render() {
    return (
      <div>
        <AppNavbar />
        <h1>Confirmation Code: </h1>
        <p>{this.props.match.params.code}</p>
      </div>
    );
  }
}

export default ConfirmEmail;
