import React, { Component } from "react";

class AnswerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: this.props.isAnswered,
    };
  }

  checkAnswer() {
    this.setState({ isAnswered: true });
    if ((this.props.isCorrect && this.state.isAnswered) === false) {
      this.props.incorrect();
    }
  }
  render() {
    if (this.props.isReset) {
      this.setState({
        isAnswered: this.props.isAnswered,
        isCorrect: this.props.isCorrect,
      });
      this.props.reset();
    }
    let isCorrect =
      this.props.isCorrect && this.state.isAnswered ? "correct" : "incorrect";
    let A = this.state.isAnswered ? isCorrect : "";
    let F = this.state.isAnswered ? () => {} : this.checkAnswer.bind(this);
    return (
      <button className="answer-box" data={A} onClick={F}>
        {this.props.answer}
      </button>
    );
  }
}
export default AnswerButton;
