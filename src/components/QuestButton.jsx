import React, { Component } from "react";

class QuestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisited: this.props.visited,
    };
  }
  visit() {
    this.setState({ isVisited: true });
    this.props.answer(this.props.dataKeys[0], this.props.dataKeys[1]);
  }
  render() {
    let isVisited = this.state.isVisited ? "url-visited" : "url";
    let funcVisit = this.state.isVisited ? () => {} : this.visit.bind(this);
    return (
      <td>
        <button className={isVisited} onClick={funcVisit}>
          {this.props.cost}
        </button>
      </td>
    );
  }
}
export default QuestButton;
