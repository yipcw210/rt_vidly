import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Like extends Component {
  render() {
    let prefix = this.props.liked ? "fas" : "far";
    return (
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        icon={[prefix, "heart"]}
      />
    );
  }
}

export default Like;
