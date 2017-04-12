// @flow
import React, { Component } from 'react';

//Import relevant components as required by specs document here
import { Button } from 'aq-miniapp';

import full_pizza from './../../assets/full-pizza.png'

import '../css/View.css';

export class View1 extends Component {
  render() {
    return (
      <div className='viewContainer justifySpaceAround'>
        <h1>Eat as many pizzas as you can</h1>
        <img id='full-pizza' alt='full-pizza' src={full_pizza} />
        <Button title='Start' onClick={this.props.onClick}/>
      </div>
    )
  }
}