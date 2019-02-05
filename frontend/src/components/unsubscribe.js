import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
  Container
} from "reactstrap";
import AppNavbar from "./AppNavbar";
import DownAlert from "./DownAlert";

class Unsubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      confirmed: 0,
      formValid: true,
      emailValid: true,
      message: "",
      offline: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://api.parkingnotifier.com/stats")
      .then(res => {
        if (res == null) {
          return res.json();
        } else {
          throw new Error(
            "Something went wrong. Fetch returned null value, check if API is down"
          );
        }
      })
      .then(result => {
        console.log(result);
        this.setState({
          confirmed: result.confirmed,
          offline: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          confirmed: 0,
          offline: true
        });
      });
  }

  handleInput = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({ [key]: value });
    this.validateEmail(e.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("EMAIL" + this.state.emailValid);
    if (!this.state.emailValid) {
      console.log("incorrect email");
      return;
    }
    fetch("http://api.parkingnotifier.com/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data.success) {
          this.setState({
            formValid: false,
            message: "Looks like you're not registered yet."
          });
        } else {
          this.setState({ success: data.success });
        }
      });
    this.setState({
      formValid: true
    });
    console.log("SUBMIT");
  };

  validateEmail = value => {
    if (value.length > 0 && /@uwec.edu\s*$/.test(value)) {
      this.setState({ emailValid: true });
    } else {
      this.setState({ emailValid: false });
    }
  };

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="navbar-offset">
          <DownAlert offline={this.state.offline} />
          <div className="container content">
            <h2>Don't want to receive updates anymore?</h2>
            <h4>No problem.</h4>
            <h6>Just use the info that you signed up with.</h6>
          </div>
          {this.state.offline ? (
            ""
          ) : (
            <div>
              {this.state.success ? (
                <Container>
                  <Alert color="primary">
                    It's sad to see you go. You're unsubscribed now.
                  </Alert>
                </Container>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  {this.state.formValid ? (
                    ""
                  ) : (
                    <Alert className="text-center" color="danger">
                      {this.state.message}
                    </Alert>
                  )}

                  <FormGroup>
                    <Label>UWEC Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="username@uwec.edu"
                      required
                      autoComplete="email"
                      value={this.state.email}
                      onChange={event => this.handleInput(event)}
                      invalid={!!!this.state.emailValid}
                    />
                    <FormFeedback>Must be a valid UWEC email.</FormFeedback>
                  </FormGroup>
                  <Button outline block color="primary" type="submit">
                    Unsubscribe
                  </Button>
                </Form>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Unsubscribe;
