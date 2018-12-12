import React, { Component } from "react";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <form onSubmit={this.handleSubmition}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={this.handleChange}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;
