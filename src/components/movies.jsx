import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  renderMovieFormat() {
    let { movies } = this.state;
    for (let index in movies) {
      movies[index] = Object.values(movies[index]);
    }
    movies.shift();
    console.log(movies.shift().map(content => <div>content</div>));
  }

  render() {
    // this.renderMovieFormat();
    return (
      <div>
        <span>Title Genre Stock Rate</span>
      </div>
    );
  }
}

export default Movies;
