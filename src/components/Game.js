import React, { Component } from 'react';
import PropTypes from 'prop-types';
import data from '../questions';
import generateRandomNumber from '../utils/random';
import Question from './Question';

class Game extends Component {
  state = {
    questions: this.retrieveQuestionsArray(data.results, 10),
    currentQuestion: generateRandomNumber(0, 10),
    loading: true,
  };

  // move to utils folder
  retrieveQuestionsArray(array, arrayLength) {
    const shuffled = array.sort(() => .5 - Math.random());
    let selected =shuffled.slice(0, arrayLength);
    return selected;
  }

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
