/* eslint-disable react/jsx-one-expression-per-line */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  componentDidUpdate() {
    //
  }

  render() {
    return (
      <div>
        <h1>Quiz app</h1>
        {this.props.name ? <p>Welcome, {this.props.name}</p> : null}
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  name: PropTypes.string,
};
