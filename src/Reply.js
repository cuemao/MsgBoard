import React, { Component } from 'react';
import './index.css';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.clickReply = this.clickReply.bind(this);
  }

  clickReply() {
    this.props.onClickReply();
  }

  render() {
    const Message = this.props.reply.message.split('\n').map((seg) =>
      <span>
        {seg}
        <br />
      </span> );
    return (
      <div className="Reply">
        <div className="User">{this.props.reply.user}</div>
        <div className="Message">{Message}</div>
        <span className="ReplyButton" onClick={this.clickReply}> Reply </span>
        <span className="Time">{this.props.reply.time}</span>
      </div>
    );
  }
}

Reply.propTypes = {
  reply: React.PropTypes.object,
  onClickReply: React.PropTypes.func,
};

export default Reply;
