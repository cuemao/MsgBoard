const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const data = [];
app.set('port', 3001);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.get('/comments', function (req, res) {
  res.json({ comments: data });
  console.log('GET');
});

app.post('/comments', function(req, res) {
  const body = req.body;
  const timeStr = getTimeStr(body.time);
  data.push({ commentIdx: data.length, user: body.user,
    message: body.message, time: timeStr, replies: [] });
  res.json({ time: timeStr, commentIdx: data.length-1 });
});

app.post('/replies', function(req, res) {
  const body = req.body;
  const timeStr = getTimeStr(body.time);
  const replies = data[body.commentIdx].replies;
  replies.push({ replyIdx: data.length, user: body.user,
    message: body.message, time: timeStr });
  res.json({ time: timeStr, replyIdx: replies.length-1 });
  console.log(data);
});

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'), '!'); 
});

function getTimeStr(str) {
  let time = new Date(str);
  return time.getFullYear() + '-' + to2Digits(time.getMonth()+1) + '-' + 
    to2Digits(time.getDate()) + ' ' + to2Digits(time.getHours()) + ':' + 
    to2Digits(time.getMinutes());
}

function to2Digits(str) {
  return ('0'+str).slice(-2);
}
