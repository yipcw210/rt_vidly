import React, { Component } from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        autoFocus
        type="text"
        className="form-control"
        id={name}
      />
    </div>
  );
};

export default Input;
