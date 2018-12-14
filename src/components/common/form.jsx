import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {};

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errMessage = this.validateProperty(input);
    errors[input.name] = errMessage ? errMessage : "";
    this.setState({ errors });

    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };
}

export default Form;
