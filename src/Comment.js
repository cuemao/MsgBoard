import React, { Component } from 'react';
import './App.css';
//import removeIco24 from './pic/remove_24.png';
//import editIco24 from './pic/edit_24.png';
import Reply from './Reply';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplyInput: false,
      user: '',
      reply: '',
    };
    
    this.clickReply = this.clickReply.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.sendReply = this.sendReply.bind(this);
  }

  clickReply() {
    this.setState({ showReplyInput: !this.state.showReplyInput });
  }

  handleNameChange(e) {
    this.setState({ user: e.target.value});
  }

  handleReplyChange(e) {
    this.setState({ reply: e.target.value});
  }
  
  sendReply(e) {
    if(e.key === 'Enter') {
      if(this.state.name!=='' && this.state.reply!==''){
        this.props.onSendReply(this.props.comment.commentIdx, 
          this.state.user, this.state.reply);
        this.setState({ reply: '', showReplyInput: false });
      }
    }
  }

  render() {
    const Replies = this.props.comment.replies.map((reply) =>
      <Reply
        key={this.props.comment.commentIdx+'-'+reply.replyIdx}
        reply={reply}
        onClickReply={this.clickReply}
      />);

    return (
      <div>
        <div>
          {this.props.comment.user}
          {this.props.comment.message}
          <span onClick={this.clickReply}> Reply </span>
          {this.props.comment.time}
        </div>
        {Replies}
        {(this.state.showReplyInput) ?
          <div>
            <input type='text' placeholder='name'
              value={this.state.user}
              onChange={this.handleNameChange}/>
            <input type='text' placeholder='reply here'
              value={this.state.reply}
              onChange={this.handleReplyChange} onKeyPress={this.sendReply}/>
          </div> : null}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object,
  onClickReply: React.PropTypes.func,
  onSendReply: React.PropTypes.func,
};

export default Comment;
