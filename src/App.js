import "./css/index.css";
import React, { Component } from "react";
import QuestButton from "./components/QuestButton";
import AnswerButton from "./components/AnswerButton";
import OrderButton from "./components/OrderButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Question: false,
      Answered: false,
      Correctly: false,
      QuizData: null,
      CurrentOrder: 1,
      incorrect: false,
      Reset: false,
      ShowAnswer: false,
    };
  }

  componentDidMount() {
    fetch("/data/QuizMap.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            QuizData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
          //console.log(error);
        }
      );
  }
  QuizQuestionSelect = (rowKey, colomnKey) => {
    let QuizData = this.state.QuizData;
    QuizData.QuizMap[rowKey]["Quests"][colomnKey]["Answered"] = true;
    this.setState({
      QuizData: QuizData,
      Question: QuizData.QuizMap[rowKey]["Quests"][colomnKey],
      Answered: true,
    });
  };
  Back = () => {
    this.setState({
      Question: false,
      Answered: false,
      CurrentOrder: 1,
      ShowAnswer: false,
      incorrect: false,
    });
  };
  ResetOrder = () => {
    this.setState({
      CurrentOrder: 1,
      Answered: false,
      incorrect: false,
      Reset: true,
    });
  };
  Reset = () => {
    this.setState({
      Reset: false,
      CurrentOrder: 1,
      incorrect: false,
    });
  };
  setIncorrect = () => {
    this.setState({ Answered: false, incorrect: true });
  };
  nextAnswer = () => {
    this.setState({ CurrentOrder: this.state.CurrentOrder + 1 });
  };
  Answered = () => {
    this.setState({ Answered: true });
  };
  ShowAnswer = () => {
    this.setState({ ShowAnswer: true });
  };
  Answers = (answers) => {
    let incorrectBtn = this.state.incorrect ? (
      <button className="back-button" onClick={this.ResetOrder}>
        <h6>Сбросить</h6>
      </button>
    ) : null;
    let style;
    if (answers.length < 4) {
      style = "answers1-3";
    } else {
      if (answers.length === 5) {
        style = "answers5";
      } else {
        style = "answers";
      }
    }
    switch (typeof answers) {
      case "object":
        switch (typeof answers[0][1]) {
          case "boolean":
            return (
              <div className="answerbox">
                <div className={style}>
                  {answers.map((answer) => (
                    <div className="answer-button">
                      <AnswerButton
                        isCorrect={answer[1]}
                        isAnswered={this.state.isAnswered}
                        answer={answer[0]}
                        incorrect={this.setIncorrect}
                        isReset={this.state.Reset}
                        reset={this.Reset}
                      />
                    </div>
                  ))}
                </div>
                {incorrectBtn}
              </div>
            );
          case "number":
            return (
              <div>
                <div className={style}>
                  {answers.map((answer) => (
                    <div className="answer-button">
                      <OrderButton
                        placeInOrder={answer[1]}
                        currentPlace={this.state.CurrentOrder}
                        next={this.nextAnswer}
                        incorrect={this.setIncorrect}
                        isAnswered={this.state.isAnswered}
                        updateAnswer={this.Answered}
                        answer={answer[0]}
                        isReset={this.state.Reset}
                        reset={this.Reset}
                      />
                    </div>
                  ))}
                </div>
                {incorrectBtn}
              </div>
            );
          default:
            break;
        }
        break;
      case "string":
        return this.state.ShowAnswer ? (
          <p className="answer-text">{this.state.Question.Answer}</p>
        ) : this.state.Question.Answer !== false ? (
          <button className="back-button" onClick={this.ShowAnswer}>
            <h6>Ответ</h6>
          </button>
        ) : null;
      default:
        return;
    }
  };
  View = () => {
    if (!this.state.isLoaded|this.state.QuizData==null) {
      return (
        <div className="quiz-question">
          <p className="question">Загрузка</p>
        </div>
      );
    }
    if (this.state.Question === false) {
      return (
        <table className="quiz-table">
          <tbody>
            {this.state.QuizData.QuizMap.map((row, rowKey) => (
              <tr>
                <td className="quiz-title">
                  <h1>{row.title}</h1>
                </td>
                {row.Quests.map((quest, colomnKey) => (
                  <QuestButton
                    cost={quest.Cost}
                    dataKeys={[rowKey, colomnKey]}
                    answer={this.QuizQuestionSelect}
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
      if (typeof this.state.Question.Answer !== "undefined") {
        answers = this.Answers(this.state.Question.Answer);
      }
      let image = (typeof this.state.Question.ImageSrc !== "undefined")?(<img className="QuestImage" src={"/data/img/"+this.state.Question.ImageSrc} alt=""/>):(null);
      console.log(typeof this.state.Question.ImageSrc !== "undefined");
      return (
        <div className="quiz-question">
          <p className="question">{this.state.Question.Question}</p>
          {image}
          {answers}
          <button className="back-button" onClick={this.Back}>
            <h6>Вернуться к вопросам</h6>
          </button>
        </div>
      );
    }
  };
  render() {
    let CssProperties = {};
    if (this.state.QuizData !== null) {
      CssProperties = {
        "--bg-color": "rgb(" + this.state.QuizData.BGColor + ")",
        "--play-button-selection-color":
          "rgb(" + this.state.QuizData.SelectionColor + ")",
        "--play-button-bg-color": "rgb(" + this.state.QuizData.BtnColor + ")",
        "--play-button-visited-color":
          "rgb(" + this.state.QuizData.AnsweredColor + ")",
      };
    }
    return (
      <div className="App" style={CssProperties}>
        <div className="warning">
          <h1 className="text">Не хватает размера экрана для отображения</h1>
        </div>
        <div className="quiz-area">
          <h1 className="title">{(this.state.isLoaded)?(this.state.QuizData.Title):("")}</h1>
          <div className="quiz">{this.View()}</div>
          <h6 className="title">{(this.state.isLoaded)?(this.state.QuizData.SubTitle):("")}</h6>
        </div>
      </div>
    );
  }
}

export default App;
