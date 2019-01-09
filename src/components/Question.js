/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../utils/shuffle';

class Question extends Component {
  state = {
    booleanOption: 'True',
    multivalueOption: '',
  };

  componentDidMount() {
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
        this.props.questionData.correct_answer === this.state.booleanOption,
    );
  };

  decodeQuestion = (data) => {
    return data
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  renderQuestion = (question) => {
    if (question.type === 'boolean') {
      return (
        <div>
          <p>{this.decodeQuestion(question.question)}</p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="True">
              True
              <input
                type="radio"
                name="true"
                value="True"
                checked={this.state.booleanOption === 'True'}
                onChange={this.handleOptionChange}
              />
            </label>

            <label htmlFor="False">
              False
              <input
                type="radio"
                name="false"
                value="False"
                checked={this.state.booleanOption === 'False'}
                onChange={this.handleOptionChange}
              />
            </label>

            <button type="submit">Submit answer</button>
          </form>
        </div>
      );
    }
    if (question.type === 'multiple') {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
          {this.decodeQuestion(question.question)}
            <select value={this.state.value} onChange={this.handleChange}>
              {this.createOption(question)}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    return '';
  };

  createOption(object) {
    const output = [];
    output.push(
      <option key={object.correct_answer} value={object.correct_answer}>
        {object.correct_answer}
      </option>,
    );
    object.incorrect_answers.forEach((answer) => {
      output.push(
        <option key={`${answer}_${answer.id}`} value={answer}>
          {answer}
        </option>,
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
