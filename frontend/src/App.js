import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Home from "./components/Home";
import Register from "./components/Register";
import About from "./components/About";
import Unsubscribe from "./components/unsubscribe";

library.add(fab, faEnvelope);

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/unsubscribe" exact component={Unsubscribe} />
        <Route path="/about" exact component={About} />
      </Switch>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
