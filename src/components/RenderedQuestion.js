/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import cleanupText from '../utils/cleanText';
import BooleanChoice from './BooleanChoice';

const RenderedQuestion = ({ question, options, handleSubmit, booleanOption, handleOptionChange, multivalueOption }) => {
  if (question.type === 'boolean') {
    return (
      <div>
        <p>{cleanupText(question.question)}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <BooleanChoice
            value
            checked={booleanOption === 'true'}
            label="True"
            type="radio"
            onChange={(e) => handleOptionChange(e)}
          />
          <BooleanChoice
            value={false}
            label="False"
            checked={booleanOption === 'false'}
            type="radio"
            onChange={(e) => handleOptionChange(e)}
          />
          <button type="submit">Submit answer</button>
        </form>
      </div>
    );
  }
  if (question.type === 'multiple' && options) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          {cleanupText(question.question)}
          <select value={multivalueOption} onChange={(e) => handleOptionChange(e)}>
            {options}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  return '';
};

export default RenderedQuestion;
