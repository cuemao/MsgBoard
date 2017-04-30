import React, { Component } from 'react';
import './App.css';
import Comment from './Comment';
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3001';

class MsgBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      comment: '',
      comments: [],
    };
    
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.sendReply = this.sendReply.bind(this);
  }
  
  componentDidMount() {
    axios.get('/comments')
    .then((res) => {
      this.setState({ comments: res.data.comments});
    }).catch((err) => {
      console.log(err);
    });
  }

  handleNameChange(e) {
    this.setState({ user: e.target.value });
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  sendComment(e) {
    if(e.key === 'Enter') {
      if(this.state.user!=='' && this.state.comment!=='') 
        axios.post('/comments', {
          user: this.state.user, 
          message: this.state.comment,
          time: new Date(),
        }).then((res) => {
          const comments = this.state.comments;
          comments.push({ commentIdx: res.data.commentIdx, user: this.state.user,
            message: this.state.comment, time: res.data.time, replies: [] });
          this.setState({ comments: comments, comment: '' });
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  sendReply(idx, user, reply) {
    axios.post('/replies', {
      user: user,
      message: reply,
      time: new Date(), 
      commentIdx: idx
    }).then((res) => {
      const comments = this.state.comments;
      comments[idx].replies.push({ replyIdx: res.data.replyIdx, user: user,
        message: reply, time: res.data.time });
      this.setState({comments: comments});
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
        <input type='text' placeholder='name'
          value={this.state.user}
          onChange={this.handleNameChange}/>
        <input type='text' placeholder='leave a message here' 
          value={this.state.comment}
          onChange={this.handleCommentChange} onKeyPress={this.sendComment}/>
        {Comments}
      </div>
    );
  }
}

export default MsgBoard;
