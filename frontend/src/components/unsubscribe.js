import React from "react";
import InputMask from "react-input-mask";
import { Button } from "react-bootstrap";

const Unsubscribe = props => {
  return (
    <div className="App">
      <div className="content">
        <img
          src={require("../clearwater_logo.png")}
          className="img-responsive"
          id="StudentSenateLogo"
          alt="StudentSenateLogo"
        />
      </div>
      <div className="container">
        <h3> Parking Notifier Unsubscribe </h3>
        <p>
          {" "}
          If you would no longer like to receive parking notifications, please
          complete the form below.{" "}
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" id="username">
            <label htmlFor="username"> Username </label>
            <input
              type="name"
              className="form-control"
              autoFocus
              id="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber"> Phone Number </label>
            <InputMask
              mask="999-999-9999"
              type="tel"
              className="form-control"
              id="phoneNumber"
              onChange={this.handleChange}
            />
          </div>
          <Button
            block
            type="submit"
            className="btn-primary"
            bsSize="large"
            //            disabled={!this.validateForm()}
          >
            {" "}
            Submit{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

// handleSubmit = event => {
//   axios
//     .post(`http://localhost:9000/users`, {
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       username: this.state.email,
//       phoneNumber: this.state.phoneNumber
//     })
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

export default Unsubscribe;
