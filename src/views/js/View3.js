import React, { Component } from 'react';
import type { Output } from '../Types';

import { Button } from 'aq-miniapp';

import arm1 from './../../assets/arm1.png';
import man from './../../assets/man.png';
import plate_pizza from './../../assets/plate.png';

import '../css/View3.css';

type Props = {
  output: Output
}

export class View3 extends Component {
  props: Props;

  render() {
    let title = 'Sorry... try Again!';
    let classCss = '';
    
    if(this.props.output){
      title = 'Awesome!';
      classCss = ' win';
    }
      
    return (
      <div className='viewContainer justifySpaceAround'>
        <div className={'title'+classCss}>{title}</div>
        <div className='v3bloc-game' id='bloc-game'>
          <img className='v3man' id='v3man' alt='man' src={man} />
          <img className='v3arm' id='v3arm1' alt='arm1' src={arm1} />
          <img className='plate-pizza' id='v3plate-pizza' alt='plate-pizza' src={plate_pizza} />
        </div>
        <Button title='Restart' onClick={this.props.onClick}/>
      </div>
    )
  }
}
