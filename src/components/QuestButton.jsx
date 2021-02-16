import React, { Component } from "react";

class QuestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisited: this.props.visited,
    };
  }
  Visit() {
    this.setState({ isVisited: true });
    this.props.updater(this.props.dataKeys[0], this.props.dataKeys[1], true);
  }
  render() {
    let isVisited = this.state.isVisited ? "url-visited" : "url";
    let Visit = this.state.isVisited ? () => {} : this.Visit.bind(this);
    return (
      <td>
        <button className={isVisited} onClick={Visit}>
          {this.props.cost}
        </button>
      </td>
    );
  }
}
export default QuestButton;
