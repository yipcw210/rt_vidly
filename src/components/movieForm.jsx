import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    }
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async componentDidMount() {
    let { data: genres } = await getGenres();

    const data = { ...this.state.data };
    data.genreId = genres[0]._id;
    this.setState({ genres, data });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit() {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }
  ///////////

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "NumberInStock", "number")}
        {this.renderInput("dailyRentalRate", "DailyRentalRate", "number")}
        {this.renderButton("Add Movie")}
      </form>
    );
  }
}

export default MovieForm;
