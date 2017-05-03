import React from 'react';
import ReactDOM from 'react-dom';
import MsgBoard from './MsgBoard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MsgBoard />, div);
});
