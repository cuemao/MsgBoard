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

app.get('/comments/:page', function (req, res) {
  const page = parseInt(req.params.page);
  console.log(typeof(page), page);
  let totalPage = Math.ceil(data.length/5);
  if(totalPage === 0) totalPage = 1;
  if(page === 0)
    res.json({ comments: data.slice(-5), totalPage: totalPage});
  else
    res.json({ comments: data.slice((-1)*page*5-5, (-1)*page*5), 
      totalPage: totalPage});
  console.log('GET');
});

app.post('/comments', function(req, res) {
  const body = req.body;
  data.push({ commentIdx: data.length, user: body.user,
    message: body.message, time: body.time, replies: [] });
  res.json({ commentIdx: data.length-1, totalPage: Math.ceil(data.length/5) });
});

app.post('/replies', function(req, res) {
  const body = req.body;
  const replies = data[body.commentIdx].replies;
  replies.push({ replyIdx: replies.length, user: body.user,
    message: body.message, time: body.time });
  res.json({ replyIdx: replies.length-1 });
});

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'), '!'); 
});

