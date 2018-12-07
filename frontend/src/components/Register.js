import React, { Component } from "react";
import InputMask from "react-input-mask";
import AppNavbar from "./AppNavbar";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="container navbar-offset" />
        <div className="row">
          <div className="col align-self-center">
            <h2> Register to Receive Text Alerts</h2>
            <h6>
              When you register with the Parking Notifier, you will receive a
              text message when alternate side parking takes effect. It'll tell
              you which side of the street to park on and when the rules will
              end (3 days after the start of the rules).
            </h6>
            <Form>
              <label htmlFor="frmNameA">Name</label>
              <Row form="true">
                <Col md={6}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="fname"
                      id="frmNameA"
                      placeholder="First"
                      required
                      autoComplete="given-name"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      id="lName"
                      name="lname"
                      type="text"
                      placeholder="Last"
                      autoComplete="family-name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Phone Number</Label>
                <InputMask
                  mask="999-999-9999"
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                />
              </FormGroup>
              <FormGroup>
                <Label>UWEC Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="username@uwec.edu"
                  autoComplete="email"
                />
              </FormGroup>
              <Button outline block color="primary" type="submit">
                Register
              </Button>
            </Form>
          </div>
          <div id="exampleContainer" className="col align-self-center">
            <img
              src={require("../media/demo_text.jpg")}
              className="text-example-img"
              id="demo_text"
              alt="Text Message Example"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
