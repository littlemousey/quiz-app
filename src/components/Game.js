import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generateRandomNumber from '../utils/random';
import Question from './Question';
import createNewRandomizedArray from '../utils/randomizedArray';
import { getQuestions } from '../services/getQuestionsData';

class Game extends Component {
  state = {
    questions: createNewRandomizedArray([], 10),
    currentQuestion: generateRandomNumber(0, 10),
    answeredQuestions: [],
    loading: true,
  };

  componentWillMount() {
    getQuestions().then((opentdbData) => {
      this.setState({ questions: createNewRandomizedArray(opentdbData.results, 10) });
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  onSubmitAnswer = (answer) => {
    const isAnsweredCorrect = this.state.questions[this.state.currentQuestion].correct_answer === answer;
    const recordedQuestion = {
      question: this.state.questions[this.state.currentQuestion].question,
      correctAnswer: this.state.questions[this.state.currentQuestion].correct_answer,
      userAnswer: answer,
    };

    this.setState((prevState) => ({
      answeredQuestions: [...prevState.answeredQuestions, recordedQuestion],
    }));

    const getNewQuestions = (prevState) =>
      prevState.questions.filter((question, index) => {
        if (index !== prevState.currentQuestion) {
          return true;
        }
        return false;
      });
    this.setState(
      (prevState) => ({
        questions: getNewQuestions(prevState),
        currentQuestion: generateRandomNumber(0, prevState.questions.length - 2),
      }),
      () => this.props.onSubmitAnswer(isAnsweredCorrect, this.state.questions.length - 1, this.state.answeredQuestions)
    );
  };

  render() {
    if (!this.state.loading && this.state.questions.length > 0) {
      return (
        <div>
          <h3>Question</h3>
          <Question
            onSubmitAnswer={this.onSubmitAnswer}
            questionData={this.state.questions[this.state.currentQuestion]}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="ui active centered inline loader" />
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  onSubmitAnswer: PropTypes.func,
};
