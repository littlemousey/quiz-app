import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generateRandomNumber from '../utils/random';
import Question from './Question';
import createNewRandomizedArray from '../utils/randomizedArray';
import triviaService from '../services/getQuestionsData';
import gifImage from '../img/loading.gif'

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: createNewRandomizedArray([], 10),
      currentQuestion: generateRandomNumber(0, 10),
      loading: true,
    };

    triviaService.getQuestions().then((opentdbData) =>{
      this.setState({questions: createNewRandomizedArray(opentdbData.results, 10)})
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }
  
  onSubmitAnswer = (answer) => {
    let answeredQuestion;
    const getNewQuestions = (prevState) => {
      return prevState.questions.filter((question, index) => {
        if(index !== prevState.currentQuestion){
          return true
        }else{
          answeredQuestion = question;
          return false
        }
      })
    } 
    this.setState((prevState) => ({
      questions: getNewQuestions(prevState),
      currentQuestion: generateRandomNumber(0, prevState.questions.length - 2),
    }), () => this.props.onSubmitAnswer(answer, this.state.questions.length - 1, answeredQuestion ));
  };

  render() {
    if (!this.state.loading && this.state.questions.length > 0) {
      return (
        <div>
          <h3>Question</h3>
          <Question onSubmitAnswer={this.onSubmitAnswer} questionData={this.state.questions[this.state.currentQuestion]} />
        </div>
      );
    }
    return <div>
      <img className="loading"
     src={gifImage}
     width="100px"
     height="100px"
     alt="loading..." />
    </div>;
  }
}

export default Game;

Game.propTypes = {
  onSubmitAnswer: PropTypes.func,
};
