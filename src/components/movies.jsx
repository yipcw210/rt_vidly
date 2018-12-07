import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    tags: ["a", "b", "c"]
  };

  spanStyles = {
    margin: 50
  };

  divStyles = {
    border: "solid"
  };

  handleDelete = () => {};

  renderMovie() {
    let movies = JSON.parse(JSON.stringify(this.state.movies));
    console.log(this.state.movies);
    console.log(movies);
    let movieProps;

    for (let index in movies) {
      movies[index].genre = movies[index].genre.name;
      delete movies[index]._id;
      delete movies[index].publishDate;
      movieProps = Object.keys(movies[index]);
      movies[index] = Object.values(movies[index]);
      movies[index] = movies[index].map(e => (
        <span style={this.spanStyles}>{e}</span>
      ));
    }

    // this.setState({ state: movies });
    movieProps = movieProps.map(value => (
      <span style={this.spanStyles}>{value}</span>
    ));

    let movieMessage = (
      <div>Showing {movies.length} movies in the database</div>
    );
    const movieToRender = movies.map((value, index) => (
      <div style={this.divStyles}>
        {value}
        <button
          onClick={() => {
            this.state.movies.splice(index, 1);
            this.setState({ movies: this.state.movies });
            console.log("delete");
          }}
        >
          Delete
        </button>
      </div>
    ));

    return [movieMessage, ...movieProps, ...movieToRender];
  }

  render() {
    // this.Format();
    return (
      <div>
        {this.state.movies.length !== 0 && this.renderMovie()}
        {this.state.movies.length === 0 && <div>no movies</div>}
      </div>
    );
  }
}

export default Movies;
