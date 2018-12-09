import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    currentGroup: "All Genres"
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGroupChange = group => {
    console.log(group);
    this.setState({ currentGroup: group });
  };

  rederMovieTable() {
    const { pageSize, currentPage, currentGroup } = this.state;
    const allMovies = this.state.movies.filter(
      movie => movie.genre.name === currentGroup
    );
    if (allMovies.length === 0) return <div>There are no movies</div>;
    const movies = paginate(allMovies, currentPage, pageSize);
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
    const { genres, pageSize, currentPage, currentGroup } = this.state;
    const allMovies = this.state.movies.filter(
      movie => movie.genre.name === currentGroup
    );
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm">
            <ListGroup groups={genres} onGroupChange={this.handleGroupChange} />
          </div>
          <div className="col-sm">
            {this.rederMovieTable()}
            <Pagination
              itemsCount={allMovies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
