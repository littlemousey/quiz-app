/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../utils/shuffle';
import RenderedQuestion from './RenderedQuestion';

class Question extends Component {
  state = {
    booleanOption: 'true',
    multivalueOption: '',
    counter: 29,
    questionOptions: null,
  };

  componentDidMount() {
    if (this.props.questionData.type === 'multiple') {
      this.setState(() => ({
        questionOptions: this.createOptions(this.props.questionData),
      }));
    }
    this.interval = setInterval(() => this.handleTimerTick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTimerTick = () => {
    if (this.state.counter === 0) {
      this.stopTimer();
    }
    console.log(this.state.counter);
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));
  };

  stopTimer = () => {
    console.log('Timer Stopping');
    clearInterval(this.interval);
    this.handleSubmit(false);
  };

  restartTimer = () => {
    this.setState(() => ({
      counter: 29,
      questionOptions: this.createOptions(this.props.questionData),
    }));
    clearInterval(this.interval);
    this.interval = setInterval(() => this.handleTimerTick(), 1000);
  };

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
    // reset counter back to initial amount
    this.restartTimer();
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
        <RenderedQuestion
          handleSubmit={this.handleSubmit}
          booleanOption={this.state.booleanOption}
          multivalueOption={this.state.multivalueOption}
          handleOptionChange={this.handleOptionChange}
          question={this.props.questionData}
          options={this.state.questionOptions}
        />
        Time left for this question: {this.state.counter}
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  onSubmitAnswer: PropTypes.func,
  questionData: PropTypes.object,
};
