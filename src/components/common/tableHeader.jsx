import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class tableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <FontAwesomeIcon icon={"sort-up"} />;
    return <FontAwesomeIcon icon={"sort-down"} />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              style={{ cursor: "pointer" }}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

// {
//   columns.map(column => {
//     <th onClick={() => this.raiseSort(column.path)}>{column.label}</th>;
//   });
// }

export default tableHeader;
