import "./css/index.css";
import React, { Component } from "react";
import { quizData } from "./QuizData/QuizMap";
import QuestButton from "./components/QuestButton";
import AnswerButton from "./components/AnswerButton";
import OrderButton from "./components/OrderButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Question: false,
      Answered: false,
      QuizData: quizData,
      CurrentOrder: 1,
      Incorrect: false,
      Reset: false,
      ShowAnswer: false,
    };
  }
  updateQuizData = (rowKey, colomnKey, newData) => {
    let QuizData = this.state.QuizData;
    QuizData[rowKey]["Quests"][colomnKey]["Answered"] = newData;
    this.setState({
      QuizData: QuizData,
      Question: QuizData[rowKey]["Quests"][colomnKey],
      Answered: true,
    });
  };
  Back = () => {
    this.setState({
      Question: false,
      Answered: false,
      CurrentOrder: 1,
      ShowAnswer: false,
    });
  };
  ResetOrder = () => {
    this.setState({
      CurrentOrder: 1,
      Answered: false,
      Incorrect: false,
      Reset: true,
    });
  };
  Reset = () => {
    this.setState({
      Reset: false,
      CurrentOrder: 1,
      Incorrect: false,
    });
  };
  SetIncorrect = () => {
    this.setState({ Answered: false, Incorrect: true });
  };
  NextAnswer = () => {
    this.setState({ CurrentOrder: this.state.CurrentOrder + 1 });
  };
  Answered = () => {
    this.setState({ Answered: true });
  };
  ShowAnswer = () => {
    this.setState({ ShowAnswer: true });
  };
  Answers = (answers) => {
    let style;
    if (answers.length < 4) {
      style = "answersRow";
    } else {
      if (answers.length === 5) {
        style = "answers5";
      } else {
        style = "answers";
      }
    }
    let IncorrectBtn = this.state.Incorrect ? (
      <button class="back-button" onClick={this.ResetOrder}>
        <h6>Сбросить</h6>
      </button>
    ) : null;
    if (typeof answers[0][1] === "boolean") {
      return (
        <div className="answerbox">
          <div className={style}>
            {answers.map((answer) => (
              <div className="answer-button">
                <AnswerButton
                  isCorrect={answer[1]}
                  isAnswered={this.state.isAnswered}
                  Answer={answer[0]}
                  Incorrect={this.SetIncorrect}
                  Reset={this.state.Reset}
                  Update={this.Reset}
                />
              </div>
            ))}
          </div>
          {IncorrectBtn}
        </div>
      );
    } else {
      return (
        <div>
          <div className={style}>
            {answers.map((answer) => (
              <div className="answer-button">
                <OrderButton
                  placeInOrder={answer[1]}
                  currentPlace={this.state.CurrentOrder}
                  Next={this.NextAnswer}
                  Incorrect={this.SetIncorrect}
                  isAnswered={this.state.isAnswered}
                  UpdateAnswer={this.Answered}
                  Answer={answer[0]}
                  Reset={this.state.Reset}
                  Update={this.Reset}
                />
              </div>
            ))}
          </div>
          {IncorrectBtn}
        </div>
      );
    }
  };
  View = () => {
    if (this.state.Question === false) {
      return (
        <table className="quiz-table">
          <tbody>
            {this.state.QuizData.map((row, rowKey) => (
              <tr>
                <td className="quiz-title">
                  <h1>{row.title}</h1>
                </td>
                {row.Quests.map((quest, colomnKey) => (
                  <QuestButton
                    cost={quest.Cost}
                    dataKeys={[rowKey, colomnKey]}
                    updater={this.updateQuizData}
                    visited={quest.Answered}
                    answered={this.state.Answered}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      let answers;
      if (this.state.Question.Answers !== false) {
        answers = this.Answers(this.state.Question.Answers);
      } else {
        answers = this.state.ShowAnswer ? (
          <h2>{this.state.Question.Answer}</h2>
        ) : this.state.Question.Answer !== false ? (
          <button class="back-button" onClick={this.ShowAnswer}>
            <h6>Ответ</h6>
          </button>
        ) : null;
      }
      return (
        <div class="quiz-question">
          <p class="question">{this.state.Question.Question}</p>
          {answers}
          <button class="back-button" onClick={this.Back}>
            <h6>Вернуться к вопросам</h6>
          </button>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="App">
        <div className="quiz-area">
          <h1 className="title">Управление персоналом</h1>
          <div className="quiz">{this.View()}</div>
          <h6 className="title">
            Подготовили студенты группы ИК-022: Гуляев Егор, Смирнова Наталия,
            Сидоренко Александр
          </h6>
        </div>
      </div>
    );
  }
}

export default App;
