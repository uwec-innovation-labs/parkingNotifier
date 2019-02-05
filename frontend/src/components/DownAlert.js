import React, { Component } from "react";
import { Alert } from "reactstrap";

class DownAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage:
        "Sorry! There is an error with an our system. Please check back later."
    };
  }

  render() {
    return (
      <div>
        {this.props.offline ? (
          <Alert className="text-center" color="danger">
            {this.state.errorMessage}
          </Alert>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DownAlert;
