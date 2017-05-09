import React, { Component } from 'react';
import showIco from './pic/show.png';
import hideIco from './pic/hide.png';
import Reply from './Reply';
import './index.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplyInput: false,
      user: '',
      reply: '',
      showReply: false,
      waiting: false,
    };

    this.clickReply = this.clickReply.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.sendReply = this.sendReply.bind(this);
    this.showReply = this.showReply.bind(this);
    this.hideReply = this.hideReply.bind(this);
  }

  clickReply() {
    this.setState({ showReplyInput: !this.state.showReplyInput });
  }

  handleNameChange(e) {
    this.setState({ user: e.target.value });
  }

  handleReplyChange(e) {
    this.setState({ reply: e.target.value });
  }

  sendReply(e) {
    if (e.key === 'Enter') {
      if (this.state.user !== '' && this.state.reply !== '') {
        this.setState({ waiting: true });
        this.props.onSendReply(this.props.comment.commentIdx,
          this.state.user, this.state.reply)
          .then(() => {
            this.setState({ reply: '', showReply: true, waiting: false });
          });
      }
    }
  }

  showReply() {
    this.setState({ showReply: true });
  }

  hideReply() {
    this.setState({ showReply: false, showReplyInput: false });
  }

  render() {
    const Replies = (this.state.showReply) ?
      this.props.comment.replies.map((reply) =>
        <Reply
          key={reply.replyIdx}
          reply={reply}
          onClickReply={this.clickReply}
        />) : null;

    return (
      <div className="Comment">
        <div>
          <div className="User">{this.props.comment.user}</div>
          <div className="Message">{this.props.comment.message}</div>
          <span className="ReplyButton" onClick={this.clickReply}> Reply </span>
          <span className="Time">{this.props.comment.time}</span>
          {(this.props.comment.replies.length > 0) ?
            (this.state.showReply) ?
              <span className="ShownHide">
                <img
                  className="ArrowImg"
                  alt="hide"
                  src={hideIco} onClick={this.hideReply}
                />
                <span className="ReplyNum">
                  {this.props.comment.replies.length}
                </span>
              </span> :
              <span className="ShownHide">
                <img
                  className="ArrowImg"
                  alt="show"
                  src={showIco} onClick={this.showReply}
                />
                <span className="ReplyNum">
                  {this.props.comment.replies.length}
                </span>
              </span> : null}
        </div>
        {Replies}
        {(this.state.showReplyInput) ?
          <div className="ReplyInput">
            <input
              disabled={(this.state.waiting) ? 'disabled' : null}
              type="text" style={{ fontSize: '16px' }} placeholder="name"
              value={this.state.user}
              onChange={this.handleNameChange} onKeyPress={this.sendReply}
            />
            <input
              disabled={(this.state.waiting) ? 'disabled' : null}
              type="text" style={{ fontSize: '16px' }} placeholder="reply here"
              value={this.state.reply}
              onChange={this.handleReplyChange} onKeyPress={this.sendReply}
            />
          </div> : null}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object,
  onSendReply: React.PropTypes.func,
};

export default Comment;
