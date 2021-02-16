import React, { Component } from "react";

class AnswerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: this.props.isAnswered,
      isCorrect: this.props.isCorrect,
    };
  }

  CheckAnswer() {
    this.setState({ isAnswered: true });
    if ((this.state.isCorrect && this.state.isAnswered)===false) {
      this.props.Incorrect();
    }
  }
  render() {
    if (this.props.Reset) {
      this.setState({
        isAnswered: this.props.isAnswered,
        isCorrect: this.props.isCorrect,
      });
      this.props.Update();
    }
    let isCorrect =
      this.state.isCorrect && this.state.isAnswered ? "correct" : "incorrect";
    let A = this.state.isAnswered ? isCorrect : "";
    let F = this.state.isAnswered ? () => {} : this.CheckAnswer.bind(this);
    return (
      <button className="answer-box" data={A} onClick={F}>
        {this.props.Answer}
      </button>
    );
  }
}
export default AnswerButton;
