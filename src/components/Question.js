/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../utils/shuffle';
import cleanupText from '../utils/cleanText';
import BooleanChoice from './BooleanChoice';

class Question extends Component {
  state = {
    booleanOption: 'True',
    multivalueOption: '',
  };

  componentDidMount() {
    // console.log(this.props.questionData);
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      booleanOption: changeEvent.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({ multivalueOption: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmitAnswer(
      this.props.questionData.correct_answer === this.state.multivalueOption ||
        this.props.questionData.correct_answer === this.state.booleanOption
    );
  };

  renderQuestion = (question) => {
    if (question.type === 'boolean') {
      return (
        <div>
          <p>{cleanupText(question.question)}</p>
          <form onSubmit={this.handleSubmit}>
            <BooleanChoice
              value={this.state.booleanOption}
              label="True"
              type="radio"
              onChange={this.handleOptionChange}
            />
            <BooleanChoice
              value={this.state.booleanOption}
              label="False"
              type="radio"
              onChange={this.handleOptionChange}
            />
            <button type="submit">Submit answer</button>
          </form>
        </div>
      );
    }
    if (question.type === 'multiple') {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            {cleanupText(question.question)}
            <select value={this.state.multivalueOption} onChange={this.handleChange}>
              {this.createOptions(question)}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    return '';
  };

  createOptions(object) {
    const output = [];
    output.push(
      <option key={object.correct_answer} value={object.correct_answer}>
        {object.correct_answer}
      </option>
    );
    object.incorrect_answers.forEach((answer) => {
      output.push(
        <option key={`${answer}_${answer.id}`} value={answer}>
          {answer}
        </option>
      );
    });
    return shuffle(output);
  }

  render() {
    return <div>{this.renderQuestion(this.props.questionData)}</div>;
  }
}

export default Question;

Question.propTypes = {
  onSubmitAnswer: PropTypes.func,
  questionData: PropTypes.object,
};
