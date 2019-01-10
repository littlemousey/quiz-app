/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ questionsRight }) => (
  <div>
    <h3>That was it!</h3>
    <p>Amount of questions you answered right: {questionsRight}</p>
  </div>
);

export default Results;

Results.propTypes = {
  questionsRight: PropTypes.number,
};
