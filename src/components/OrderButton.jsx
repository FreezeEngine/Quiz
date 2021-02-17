import React, { Component } from "react";

class AnswerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
    };
  }
  CheckAnswer() {
    this.props.updateAnswer();
    this.setState({
      isAnswered: true,
      currentPlace: this.props.currentPlace,
    });
    if (this.props.placeInOrder !== this.props.currentPlace) {
      this.incorrect();
    }
    this.props.next();
  }
  incorrect() {
    this.props.incorrect();
    return "incorrect";
  }
  render() {
    if (this.props.isReset) {
      this.setState({
        isAnswered: false,
      });
      this.props.reset();
    }
    let isCorrect =
      this.props.placeInOrder === this.state.currentPlace
        ? "correct"
        : "incorrect";
    let F = this.state.isAnswered ? () => {} : this.CheckAnswer.bind(this);
    let A =
      this.state.isAnswered && this.props.isReset === false ? isCorrect : "";
    return (
      <button className="answer-box" data={A} onClick={F}>
        {this.props.answer}
      </button>
    );
  }
}
export default AnswerButton;
