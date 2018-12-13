import React, { Component } from "react";
import InputMask from "react-input-mask";
import AppNavbar from "./AppNavbar";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  FormFeedback
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      fname: "",
      lname: "",
      phone: "",
      email: "",
      formErrors: { emmail: "", phone: "" },
      emailValid: null,
      phoneValid: false,
      formValid: false,
      message: "This needs to be a valid UWEC email address."
    };
  }

  componentDidMount() {
    fetch("http://api.parkingnotifier.com/stats")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          count: result.count
        });
      });
  }

  handleInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value }, () => {
      this.validateField(key, value);
    });
  };

  validateField = (FieldName, value) => {
    switch (FieldName) {
      case "email":
        this.validateEmail(value);
        break;
    }
  };

  validateEmail = value => {
    if (value.length > 0 && /@uwec.edu\s*$/.test(value)) {
      console.log("It's a valid email");
      this.setState({ emailValid: true });
      return (
        <Input
          type="text"
          name="fname"
          id="frmNameA"
          placeholder="First"
          required
          autoComplete="given-name"
          value={this.state.fname}
          onChange={event => this.handleInput(event)}
          valid
        />
      );
    } else {
      console.log("It's invalid email");
      this.setState({ emailValid: false });
      return (
        <Input
          type="text"
          name="fname"
          id="frmNameA"
          placeholder="First"
          required
          autoComplete="given-name"
          value={this.state.fname}
          onChange={event => this.handleInput(event)}
          invalid
        />
      );
    }
  };

  render() {
    var emailFeedback;
    if (this.state.emailValid) {
    } else {
      emailFeedback = (
        <FormFeedback>Looks like that email's already taken.</FormFeedback>
      );
    }
    return (
      <div>
        <AppNavbar />
        <div className="container navbar-offset" />
        <div className="row">
          <div className="col align-self-center">
            <Container>
              <h2> Register to Receive Text Alerts</h2>
              <h6>
                When you register with the Parking Notifier, you will receive a
                text message when alternate side parking takes effect. It'll
                tell you which side of the street to park on and when the rules
                will end (3 days after the start of the rules).
              </h6>
              <div className="statCard">
                <h4>
                  Join{" "}
                  {this.state.count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  others receiving text alerts.
                </h4>
              </div>
            </Container>
            <Form validated="true">
              <Label htmlFor="frmNameA">Name</Label>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="fname"
                      id="frmNameA"
                      placeholder="First"
                      required
                      autoComplete="given-name"
                      value={this.state.fname}
                      onChange={event => this.handleInput(event)}
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
                      required
                      autoComplete="family-name"
                      value={this.state.lname}
                      onChange={event => this.handleInput(event)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Phone Number</Label>
                <InputMask
                  mask="999-999-9999"
                  required
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phone"
                  value={this.state.phone}
                  onChange={event => this.handleInput(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label>UWEC Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="username@uwec.edu"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={event => this.handleInput(event)}
                  invalid={!!!this.state.emailValid}
                />
                <FormFeedback>{this.state.message}</FormFeedback>
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
              alt="Text Message Example"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
