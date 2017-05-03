import React, { Component } from 'react';
import './App.css';
import Comment from './Comment';
import nextIco from './pic/next.png';
import previousIco from './pic/previous.png';

const axios = require('axios');

axios.defaults.baseURL = 'https://server-urbgaaleox.now.sh';

function to2Digits(str) {
  return (`0,${str}`).slice(-2);
}

function getTimeStr(str) {
  const time = new Date(str);
  return `${time.getFullYear()},-,${to2Digits(time.getMonth() + 1)},-,
    ${to2Digits(time.getDate())}, ,${to2Digits(time.getHours())}:
    ${to2Digits(time.getMinutes())}`;
}

class MsgBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      comment: '',
      comments: [],
      currentPage: 0,
      totalPage: 1,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.sendReply = this.sendReply.bind(this);
    this.getPage = this.getPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    this.getPage(0);
  }

  getPage(p) {
    axios.get(`/comments/,${p}`)
    .then((res) => {
      res.data.comments.forEach((comment) => {
        comment.time = getTimeStr(comment.time);
        comment.replies.forEach((reply) => {
          reply.time = getTimeStr(reply.time);
        });
      });
      this.setState({ comments: res.data.comments.reverse(), totalPage: res.data.totalPage });
    }).catch((err) => {
      console.log(err);
    });
  }
  nextPage() {
    this.getPage(this.state.currentPage + 1);
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  previousPage() {
    this.getPage(this.state.currentPage - 1);
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  handleNameChange(e) {
    this.setState({ user: e.target.value });
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  sendComment(e) {
    if (e.key === 'Enter') {
      if (this.state.user !== '' && this.state.comment !== '') {
        const time = new Date();
        axios.post('/comments', {
          user: this.state.user,
          message: this.state.comment,
          time: time,
        }).then((res) => {
          let comments = this.state.comments;
          comments = [{ commentIdx: res.data.commentIdx, user: this.state.user,
            message: this.state.comment, time: getTimeStr(time),
            replies: [] }].concat(comments.slice(0, 4));
          this.setState({ comments: comments, comment: '', totalPage: res.data.totalPage });
        }).then(() => {
          this.getPage(0);
          this.setState({ currentPage: 0 });
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  sendReply(idx, user, reply) {
    const time = new Date();
    axios.post('/replies', {
      user: user,
      message: reply,
      time: time,
      commentIdx: idx,
    }).then((res) => {
      const comments = this.state.comments;
      comments.find((comment) => comment.commentIdx === idx).replies.push({
        replyIdx: res.data.replyIdx, user: user,
        message: reply, time: getTimeStr(time) });
      this.setState({ comments: comments });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const Comments = this.state.comments.map((comment) =>
      <Comment
        key={comment.commentIdx}
        comment={comment}
        onSendReply={this.sendReply}
      />);

    return (
      <div className="App">
        <h1 className="App-header">Message Board</h1>
        <div className="MessageInput">
          <input
            type="text" placeholder="name"
            value={this.state.user}
            onChange={this.handleNameChange} onKeyPress={this.sendComment}
          />
          <input
            type="text" placeholder="leave a message here"
            value={this.state.comment}
            onChange={this.handleCommentChange} onKeyPress={this.sendComment}
          />
        </div>
        {Comments}
        <div className="Page">
          {(this.state.currentPage > 0) ?
            <img
              alt="previous" className="NextnPrevious Previous"
              src={previousIco}
              onClick={this.previousPage}
            /> : null}
          <span className="PageText">
            {'Page '}
            {this.state.currentPage + 1}
            {'/'}
            {this.state.totalPage}
          </span>
          {(this.state.currentPage + 1 !== this.state.totalPage) ?
            <img
              alt="next" className="NextnPrevious Next"
              src={nextIco}
              onClick={this.nextPage}
            /> : null}
        </div>
      </div>
    );
  }
}

export default MsgBoard;
