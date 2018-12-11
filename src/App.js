import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Movie from "./components/movies";
import Customer from "./components/customers";
import Rental from "./components/rentals";

class App extends Component {
  render() {
    return (
      <main className="Container">
        <NavBar />
        <Switch>
          <Route path="/movies" component={Movie} />
          <Route path="/customers" component={Customer} />
          <Route path="/rentals" component={Rental} />

          <Redirect to="/movies" />
        </Switch>
      </main>
    );
  }
}

export default App;
