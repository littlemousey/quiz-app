/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

function renderOverview(questions) {
  return questions.map((item, index) => (
    <div key={`${item.userAnswer}${index}`}>
      <h4>Question Asked</h4>
      {item.question}
      <h4>Your Answer:</h4>
      {item.userAnswer}
      <h4> Correct Answer</h4>
      {item.correctAnswer}
    </div>
  ));
}

const Results = ({ questionsRight, recordedQuestions }) => (
  <div>
    <h3>That was it!</h3>
    {recordedQuestions && (
      <div>
        <p>Amount of questions you answered right: {questionsRight}</p>
        <h2>Overview</h2>
        <div>{renderOverview(recordedQuestions)}</div>
      </div>
    )}
  </div>
);

export default Results;

Results.propTypes = {
  questionsRight: PropTypes.number,
  recordedQuestions: PropTypes.array,
};
