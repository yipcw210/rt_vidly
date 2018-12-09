import React from "react";

const ListGroup = props => {
  return (
    <ul className="list-group ml-5 mr-5 mt-2">
      {props.groups.map(group => (
        <li
          key={group._id}
          className="list-group-item"
          style={{ cursor: "pointer" }}
          onClick={() => props.onGroupChange(group.name)}
        >
          {group.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
