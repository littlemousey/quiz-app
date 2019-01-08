/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ amountOfQuestionsRight, questionsLeft }) => (
  <div>
    <p>{amountOfQuestionsRight} of questions answered right</p>
    <p>{questionsLeft} questions left</p>
  </div>
);

export default Footer;

Footer.propTypes = {
  amountOfQuestionsRight: PropTypes.number,
  questionsLeft: PropTypes.number,
};
