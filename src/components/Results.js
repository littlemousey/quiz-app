/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const Results = ({questionsRight}) => (
  <div>
    <h3>That was it!</h3>
    <p>Amount of questions you answered right: {questionsRight}</p>
  </div>
);

export default Results;
