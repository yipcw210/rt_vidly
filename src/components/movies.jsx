import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDeleteMovie = movieId => {
    const movies = this.state.movies.filter(movie => movie._id !== movieId);
    // console.log(movies);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  rederMovieTable() {
    const { movies } = this.state;
    if (movies.length === 0) return <div>There no movies</div>;
    return (
      <React.Fragment>
        <div>There are {movies.length} movies</div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>NumberInStock</th>
              <th>DailyRentalRate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <th>{movie.genre.name}</th>
                <th>{movie.numberInStock}</th>
                <th>{movie.dailyRentalRate}</th>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <th>
                  <button
                    onClick={() => this.handleDeleteMovie(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  render() {
    return <React.Fragment>{this.rederMovieTable()}</React.Fragment>;
  }
}

export default Movies;
