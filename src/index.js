// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {
  MiniApp
} from 'aq-miniapp';
import View from './views/View';
import './index.css';

ReactDOM.render(
  <MiniApp
    join={View}
    data={{}}
    devt={true}
  />,
  document.getElementById('root')
);
