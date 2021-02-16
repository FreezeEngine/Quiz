import React, { Component } from "react";

class AnswerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: this.props.isAnswered,
      placeInOrder: this.props.placeInOrder,
      currentPlace: this.props.currentPlace,
    };
  }
  CheckAnswer() {
    this.props.UpdateAnswer();
    this.setState({
      isAnswered: true,
      placeInOrder: this.props.placeInOrder,
      currentPlace: this.props.currentPlace,
    });
    if (this.state.placeInOrder !== this.props.currentPlace) {
      this.incorrect();
    }
    this.props.Next();
  }
  incorrect() {
    this.props.Incorrect();
    return "incorrect";
  }
  render() {
    if (this.props.Reset) {
      this.setState({
        isAnswered: false,
      });
      this.props.Update();
    }
    let isCorrect =
      this.state.placeInOrder === this.state.currentPlace
        ? "correct"
        : "incorrect";
    let F = this.state.isAnswered ? () => {} : this.CheckAnswer.bind(this);
    let A =
      this.state.isAnswered && this.props.Reset === false ? isCorrect : "";
    return (
      <button className="answer-box" data={A} onClick={F}>
        {this.props.Answer}
      </button>
    );
  }
}
export default AnswerButton;
