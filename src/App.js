import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';
import RegisterName from './components/RegisterName';
import Footer from './components/Footer';
import Header from './components/Header';
import Game from './components/Game';
import Results from './components/Results';
import './App.css';
import EasterEgg from './components/EasterEgg';

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
    const register = !this.state.name && <RegisterName setName={(string) => this.setName(string)} />;
    let mainView;
    if (this.state.name && this.state.questionsLeft > -1) {
      mainView = <Game onSubmitAnswer={this.processScore} />;
    } else if (this.state.name && this.state.questionsLeft < 0) {
      mainView = (
        <Results questionsRight={this.state.questionsRight} recordedQuestions={this.state.recordedQuestions} />
      );
    }
    const footer = this.state.name && this.state.questionsLeft > -1 && (
      <Footer amountOfQuestionsRight={this.state.questionsRight} questionsLeft={this.state.questionsLeft} />
    );

    return (
      <Container>
        <Router>
          <div className="App">
            <Header name={this.state.name} />
            {register}
            {mainView}
            {footer}
            <Divider horizontal>In need of a Corgi?</Divider>
            <Link className="link" to="/corgi">
              Click for a Corgi
            </Link>
            <Route path="/corgi" component={EasterEgg} />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
