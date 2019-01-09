import React, { Component } from 'react';
import RegisterName from './components/RegisterName';
import Footer from './components/Footer';
import Header from './components/Header';
import Game from './components/Game';
import './App.css';

class App extends Component {
  state = {
    name: '',
    questionsRight: 0,
    questionsWrong: 0,
    questionsLeft: 10
  };

  setName = (string) => {
    this.setState({ name: string });
  };

  processScore = (answerRight, questionsLeft) => {
    this.setState((prevState) => ({
      questionsRight: answerRight ? prevState.questionsRight + 1 : prevState.questionsRight,
      questionsWrong: answerRight ? prevState.questionsWrong : prevState.questionsWrong + 1,
      questionsLeft,
    }));
  };

  render() {
    return (
      <div className="App">
        <Header name={this.state.name} />
        {!this.state.name && <RegisterName setName={(string) => this.setName(string)} />}
        {this.state.name && <Game onSubmitAnswer={this.processScore} />}
        {this.state.name && <Footer amountOfQuestionsRight={this.state.questionsRight} questionsLeft={this.state.questionsLeft} />}
      </div>
    );
  }
}

export default App;
