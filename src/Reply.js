import React, { Component } from 'react';
import './App.css';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);
  }
  
  clickReply() {
    this.props.onClickReply();
  }

  render() {
    return (
      <div >
        {this.props.reply.user}
        {this.props.reply.message}
        <span onClick={this.clickReply}> Reply </span>
        {this.props.reply.time}
      </div>
    );
  }
}

Reply.propTypes = {
  reply: React.PropTypes.object,
  onClickReply: React.PropTypes.func,
};

export default Reply;
