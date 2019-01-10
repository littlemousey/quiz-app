import React, { Component } from 'react';
import RegisterName from './components/RegisterName';
import Footer from './components/Footer';
import Header from './components/Header';
import Game from './components/Game';
import Results from './components/Results';
import './App.css';

class App extends Component {
  state = {
    name: '',
    questionsRight: 0,
    questionsWrong: 0,
    questionsLeft: 9,
    recordedQuestions: [],
  };

  setName = (string) => {
    this.setState({ name: string });
  };

  processScore = (answerRight, questionsLeft, recordedQuestions) => {
    this.setState((prevState) => ({
      questionsRight: answerRight ? prevState.questionsRight + 1 : prevState.questionsRight,
      questionsWrong: answerRight ? prevState.questionsWrong : prevState.questionsWrong + 1,
      questionsLeft,
      recordedQuestions,
    }));
  };

  render() {
    return (
      <div className="App">
        <Header name={this.state.name} />
        {!this.state.name && <RegisterName setName={(string) => this.setName(string)} />}
        {this.state.name && this.state.questionsLeft > -1 && <Game onSubmitAnswer={this.processScore} />}
        {this.state.name && this.state.questionsLeft < 0 && (
          <Results questionsRight={this.state.questionsRight} recordedQuestions={this.state.recordedQuestions} />
        )}
        {this.state.name && this.state.questionsLeft > -1 && (
          <Footer amountOfQuestionsRight={this.state.questionsRight} questionsLeft={this.state.questionsLeft} />
        )}
      </div>
    );
  }
}

export default App;
