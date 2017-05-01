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
      <div className='Reply'>
        <div className='User'>{this.props.reply.user}</div>
        <div className='Message'>{this.props.reply.message.replace('\n', '<br />')}</div>
        <span className='ReplyButton' onClick={this.clickReply}> Reply </span>
        <span className='Time'>{this.props.reply.time}</span>
      </div>
    );
  }
}

Reply.propTypes = {
  reply: React.PropTypes.object,
  onClickReply: React.PropTypes.func,
};

export default Reply;
