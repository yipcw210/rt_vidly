import React, { Component } from "react";

const MovieForm = ({ match, history }) => {
  return (
    <React.Fragment>
      <h1>MovieForm {match.params.id} </h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
