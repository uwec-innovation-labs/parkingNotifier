import React, { Component } from "react";
import AppNavbar from "./AppNavbar";

class About extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="content">
          <img
            src={require("../clearwater_logo.png")}
            className="img-responsive"
            id="cwlLogo"
            alt="cwlLogo"
          />
        </div>
        <div className="container">
          <h4>
            <em>"Improving students' lives through innovative technology"</em>
          </h4>
          <p>
            Clearwater Labs is a 100% student run software incubator with the
            goal to provide quality products and high impact experiences. The
            mission of the organization is "Improving students'​ lives through
            innovative technology"​
          </p>
        </div>
      </div>
    );
  }
}

export default About;
