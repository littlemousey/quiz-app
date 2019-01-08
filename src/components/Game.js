import React, { Component } from 'react';
import PropTypes from 'prop-types';
import data from '../questions';
import generateRandomNumber from '../utils/random';
import Question from './Question';

class Game extends Component {
  state = {
    questions: data.results,
    currentQuestion: generateRandomNumber(0, data.results.length),
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  onSubmitAnswer = (answer) => {
    console.log(answer);
    this.setState((prevState) => ({ currentQuestion: generateRandomNumber(0, prevState.questions.length - 1) }));
    this.props.onSubmitAnswer(answer);
  };

  render() {
    if (!this.state.loading && Object.keys(this.state.questions).length > 0) {
      return (
        <div>
          <h3>Question</h3>
          <Question onSubmitAnswer={this.onSubmitAnswer} questionData={this.state.questions[this.state.currentQuestion]} />
        </div>
      );
    }
    return <div> loading...</div>;
  }
}

export default Game;

Game.propTypes = {
  onSubmitAnswer: PropTypes.func,
};
