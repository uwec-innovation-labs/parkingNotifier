import React, { Component } from "react";
import AppNavbar from "./AppNavbar";
import DownAlert from "./DownAlert";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      message: "",
      offline: false
    };
  }

  componentDidMount() {
    fetch("http://api.parkingnotifier.com/stats")
      .then(res => {
        if (res !== null) {
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
          message:
            "Join " +
            this.state.confirmed
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " Others"
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          confirmed: 0,
          message: "Join Now",
          offline: true
        });
      });
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="content navbar-offset">
          <DownAlert offline={this.state.offline} />
          <img
            src={require("../media/clearwater_logo.png")}
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
            students to receive tickets and compliance to be very low. Low
            compliance of the parking rules leads to decreased effectiveness of
            snowplows, and, ultimately, the degradation of road conditions
            throughout winter. The goal of this project is to decrease the
            number of tickets issued to students and increase the effectiveness
            of residential plowing.
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
          {this.state.offline ? (
            ""
          ) : (
            <a href="/register">
              <div className="button">{this.state.message}</div>
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
