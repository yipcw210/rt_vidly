import React from "react";

const ListGroup = props => {
  const {
    items,
    onItemSelect,
    textProperty,
    valueProperty,
    selectedItem
  } = props;

  return (
    <ul className="list-group ml-5 mr-5 mt-2">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item[textProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
