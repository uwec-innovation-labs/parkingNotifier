import React, { Component } from "react";
import AppNavbar from "./AppNavbar";

class Home extends Component {
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
          <h1> Parking Notifier </h1>
          <h4>The Alternate Side Parking Messaging Service</h4>
          <p>
            The city of Eau Claire, WI receives, on average, 46" of snowfall per
            year. Naturally, snow emergencies are declared many times each
            winter. Alternate side parking is critical in helping snowplows
            clear residential roads on time.
          </p>
          <p>
            In neighborhoods heavily populated by students, it's very common for
            students to receive tickets for not following the policy and
            compliance to be very low. Low compliance of the parking rules leads
            to decreased effectiveness of snowplows, and, ultimately, the
            degradation of road conditions throughout winter. The goal of this
            project is to decrease the number of tickets issued to students and
            increase the effectiveness of residential plowing.
          </p>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Alternate Side Parking Policy</h5>
              <h6 className="card-subtitle mb-2 text-muted">City Code 10.38</h6>
              <p className="card-text">
                Whenever in the opinion of the director of community services or
                that person's designee a snow event is declared to permit a full
                residential plow operation then for a period of seventy-two (72)
                hours, alternate side parking regulations shall be in effect on
                all streets in the city of Eau Claire. Such regulations shall
                apply as follows:
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                On even-numbered days, park on the even side of the street
              </li>
              <li className="list-group-item">
                On odd-numbered days, park on the odd side of the street
              </li>
              <li className="list-group-item">
                Policy lasts 72 hours (3 days) after declared
              </li>
              <li className="list-group-item">
                In effect from midnight to 5:00pm during the 72 hours
              </li>
            </ul>
          </div>
          <a href="/register">
            <div className="button">Register for Alerts</div>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
