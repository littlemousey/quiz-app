/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../utils/shuffle';
import cleanupText from '../utils/cleanText';
import BooleanChoice from './BooleanChoice';

class Question extends Component {
  state = {
    booleanOption: 'true',
    multivalueOption: '',
    counter: 2, // when the counter hits 0, we want to trigger handleSubmit();
  };

  componentDidMount() {
    this.timerId = setInterval(this.updateCounter, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleOptionChange = (changeEvent) => {
    if (this.props.questionData.type === 'multiple') {
      this.setState({
        multivalueOption: changeEvent.target.value,
      });
    } else if (this.props.questionData.type === 'boolean') {
      this.setState({
        booleanOption: changeEvent.target.value,
      });
    }
  };

  handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.questionData.type === 'multiple') {
      this.props.onSubmitAnswer(this.state.multivalueOption);
    } else if (this.props.questionData.type === 'boolean') {
      this.props.onSubmitAnswer(this.state.booleanOption);
    }
  };

  stopCounter = () => {
    console.log('stop!');
    clearInterval(this.timerID);
  };

  updateCounter = () => {
    if (this.state.counter === 0) {
      this.stopCounter();
      this.handleSubmit(false);
    } else {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }
  };

  renderQuestion = (question) => {
    if (question.type === 'boolean') {
      return (
        <div>
          <p>{cleanupText(question.question)}</p>
          <form onSubmit={this.handleSubmit}>
            <BooleanChoice
              value
              checked={this.state.booleanOption === 'true'}
              label="True"
              type="radio"
              onChange={this.handleOptionChange}
            />
            <BooleanChoice
              value={false}
              label="False"
              checked={this.state.booleanOption === 'false'}
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
            <select value={this.state.multivalueOption} onChange={this.handleOptionChange}>
              {this.createOptions(question)}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    return '';
  };

  createOptions = (object) => {
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
  };

  render() {
    return (
      <div>
        {this.state.counter}
        <div>{this.renderQuestion(this.props.questionData)}</div>
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  onSubmitAnswer: PropTypes.func,
  questionData: PropTypes.object,
};
