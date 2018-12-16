import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getMovies, deleteMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import logger from "../services/logService";
import MoviesTable from "./common/moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: "",
    searchQuery: ""
  };

  async componentDidMount() {
    let { data: genres } = await getGenres();
    genres = [{ _id: "", name: "All Genres" }, ...genres];
    let { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDeleteMovie = async movieId => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(movie => movie._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovies(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        logger.log("Movie not found");
      }
      this.setState({ movies: originalMovies });
    }
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

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
  };

  getPagedData() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pagedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: pagedMovies };
  }

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/movies/new")}
            >
              Add Movie
            </button>
            <div>Showing {totalCount} movies in the database</div>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDeleteMovie={this.handleDeleteMovie}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
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
