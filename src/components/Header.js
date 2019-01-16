/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div>
    <h1>Quiz app</h1>
    {props.name ? <p>Welcome, {props.name}</p> : null}
    <Divider />
  </div>
);

export default Header;

Header.propTypes = {
  name: PropTypes.string,
};
