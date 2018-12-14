import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Movie from "./components/movies";
import Customer from "./components/customers";
import Rental from "./components/rentals";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="Container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movie} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rental} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
