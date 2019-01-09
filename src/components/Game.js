import React, { Component } from 'react';
import PropTypes from 'prop-types';
import data from '../questions';
import generateRandomNumber from '../utils/random';
import Question from './Question';
import createNewRandomizedArray from '../utils/randomizedArray';

class Game extends Component {
  state = {
    questions: createNewRandomizedArray(data.results, 10),
    currentQuestion: generateRandomNumber(0, 10),
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
    console.log('help', this.state.questions);
  }
  
  onSubmitAnswer = (answer) => {
    this.setState((prevState) => ({
      questions: prevState.questions.filter((question, index) => index !== prevState.currentQuestion),
      currentQuestion: generateRandomNumber(0, prevState.questions.length - 2),
    }), () => this.props.onSubmitAnswer(answer, this.state.questions.length));
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
