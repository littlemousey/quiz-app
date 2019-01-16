/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Container } from 'semantic-ui-react';

class RegisterName extends Component {
  state = {
    value: '',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    this.props.setName(this.state.value);
    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <label>
            What is your name?
            <br />
            <Input
              action="Submit"
              placeholder="Name"
              name="registration"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </Container>
    );
  }
}

export default RegisterName;

RegisterName.propTypes = {
  setName: PropTypes.func,
};
