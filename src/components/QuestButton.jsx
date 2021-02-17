import React, { Component } from "react";

class QuestButton extends Component {
  constructor(props) {
    super(props);
  }
  visit() {
    this.props.updater(this.props.dataKeys[0], this.props.dataKeys[1], true);
  }
  render() {
    let isVisited = this.props.visited ? "url-visited" : "url";
    let Visit = this.props.visited ? () => {} : this.visit.bind(this);
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
