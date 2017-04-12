/*
 *    View 2
 *      Game of man eating pizzas by sliding them toward him
 *      
 *      Library animation used: gsap(greensock)
 *      More info:  https://greensock.com/docs
 * 
 */

import React, { Component } from 'react';

import TimelineMax from 'gsap/TimelineMax';
import Draggable from "gsap/Draggable";
import TweenLite from 'gsap/TweenLite';

import arm1 from './../../assets/arm1.png';
import arm2 from './../../assets/arm2.png';
import arm3 from './../../assets/arm3.png';
import arm4 from './../../assets/arm4.png';
import head from './../../assets/head.png';
import plate_pizza from './../../assets/plate.png';

import './../css/View2.css';

// Usefull to get dynamic components
const parts_pizza = {
  part_1: require('./../../assets/part1.png'),
  part_2: require('./../../assets/part2.png'),
  part_3: require('./../../assets/part3.png'),
  part_4: require('./../../assets/part4.png'),
  part_5: require('./../../assets/part5.png'),
  part_6: require('./../../assets/part6.png'),
  part_7: require('./../../assets/part7.png'),
  part_8: require('./../../assets/part8.png'),
};

export class View2 extends Component {
  constructor(props) {
    super(props);
    
    this.counter_slice_pizza = 0;
    this.number_slice_pizza = 8;
    
    // Bind with composant Counter
    this.counter_pizza = 0;
    this.maximumPizza = 0;
    this.setMaximumPizza = this.setMaximumPizza.bind(this);
    
    // Bind with composant Timer
    this.timeLeft = true;
    this.setTimeOver = this.setTimeOver.bind(this);
  };
  
  componentDidUpdate(prevProps, prevState) {
    this.counter_slice_pizza=0;
    this.loadGame();
  }
  
  /*
   *    Load Event of the game
   */
  loadGame()
  {
    const doc = document,
      docEl = doc.documentElement,
      pizzaNumberId = doc.getElementById('pizza_number'),
      countdownID = doc.getElementById('countdown'),
      blocManId = doc.getElementById('bloc-man'),
      blocMouthManY = 35,
      blocMouthManX = 30,
      blocGameId = doc.getElementById('bloc-game'),
      _this=this,
      heightUrlNav = 50,
      blocGameWidth = docEl.clientWidth,
      blocGamHeight = docEl.clientHeight - (pizzaNumberId.offsetHeight + countdownID.offsetHeight + heightUrlNav);
    
    // Set size of the bord game
    TweenLite.set(".bloc-game", {height: blocGamHeight, width: blocGameWidth});
    
    // Set event on each pizza slices 
    Draggable.create(".part-pizza", {
      type:"x,y", edgeResistance:1, dragResistance:0, bounds: blocGameId, throwProps:true,
      onDragEnd(){
        _this.eatIt(this, blocManId)
      },
      snap:{
          x: function(endValue) {
              return (Math.round(endValue) >= Math.round(this.maxX - blocMouthManX)) ? Math.round(this.maxX - blocMouthManX) : endValue;
          },
          y: function(endValue) {
              return (Math.round(endValue) <= Math.round(this.minY + blocMouthManY)) ? Math.round(this.minY + blocMouthManY) : endValue;
          }
      }
    });
  }
  
  /*
   *  onDragEnd Callback: 
   *    Calcul where the pizza is landing
   *    Eat the pizza part if the part lands close to the man
   */
  eatIt(pizza, bloc_man)
  {
    const pizzaEndX = Math.round(pizza.endX),
      pizzaEndY = Math.round(pizza.endY),
      manEndX = Math.round(pizza.maxX - (bloc_man.offsetWidth / 2)),
      manEndY = Math.round(pizza.minY + (bloc_man.offsetHeight / 2));
      
    if(pizzaEndX >= manEndX && pizzaEndY <= manEndY)
    {
      this.counter_slice_pizza ++;
      this.animationEating(pizza);
    }
  }
  
  /*
   *    Make the pizza disappear and animate the arms   
   *    When the animation is over, control the pizza left
   *      OnComplete: digestPizza
   */
   animationEating(pizza)
  {
    const vitesse_arm = 0.09, step_anim_arm = 0.08, vitesse_opacity_pizza = 0.7;
    let timeline_arm=0;
    
    TweenLite.to(pizza.target, 0, {"z-index":0});
    TweenLite.to(pizza.target, vitesse_opacity_pizza, {opacity:0, display:"none"});
    TweenLite.to("#arm1", 0, {opacity:1});
    TweenLite.to("#arm2", 0, {opacity:0});
    TweenLite.to("#arm3", 0, {opacity:1});
    TweenLite.to("#arm4", 0, {opacity:0});
    
    new TimelineMax({onComplete:this.digestPizza, onCompleteParams:[this]})
      .to("#arm1", vitesse_arm, {opacity:0}, timeline_arm)
      .to("#arm2", vitesse_arm, {opacity:1}, timeline_arm += step_anim_arm)
      .to("#arm3", vitesse_arm, {opacity:0}, timeline_arm += step_anim_arm)
      .to("#arm4", vitesse_arm, {opacity:1}, timeline_arm += step_anim_arm)
      .to("#arm1", vitesse_arm, {opacity:1}, timeline_arm)
      .to("#arm2", vitesse_arm, {opacity:0}, timeline_arm += step_anim_arm)
      .to("#arm3", vitesse_arm, {opacity:1}, timeline_arm += step_anim_arm)
      .to("#arm4", vitesse_arm, {opacity:0}, timeline_arm += step_anim_arm)
      .play();
  }
  
  /*
   *    Check pizza left
   *      Over the game if all the pizzas are eaten
   */
  digestPizza(_this)
  {
    if(_this.counter_slice_pizza >= _this.number_slice_pizza){
      _this.counter_pizza++;
      _this.forceUpdate();
    }
    
    if(_this.counter_pizza >= _this.maximum_pizza){
      _this.gameOver();
    }
  }
  
  /*
   *    Callback from composant Timer
   */
  setTimeOver() {
      this.timeLeft = false;
      this.gameOver();
  };
  
  /*
   *    Callback from composant Counter
   */
  setMaximumPizza(maximum_pizza) {
      this.maximum_pizza = maximum_pizza;
  };
  
  /*
   *  End the game
   *    Callback to View.js
   */
  gameOver()
  {
    let win = false;
    if(this.timeLeft)
      win=true;
    
    this.props.onClick(win);
  }
  
  /*
   *    Render the composants Counter, Man, Timer
   *    Load part pizza dynamically
   */
  render() {
    const rows = [];
    for (let i=1; i <= this.number_slice_pizza; i++) {
      rows.push(<img key={Math.random()} className='part-pizza' id={'part-pizza'+i} alt={'part-pizza'+i} src={parts_pizza['part_'+i]} />);
    }
    
    return (
      <div id='main'>
        <Counter 
          counter_pizza={this.counter_pizza} 
          maximum_pizza={this.setMaximumPizza}
        />
        <div className='bloc-game' id='bloc-game'>
          <div id='box_pizza'>
            <img className='plate-pizza' id='plate-pizza' alt='plate-pizza' src={plate_pizza} />
            {rows}
          </div>
          <Man />
        </div>
        <Timer timeOver={this.setTimeOver} />
      </div>
    );
  }
}

/*
 *    Man Component
 */
function Man() {
  return(  
    <div className='bloc-man' id='bloc-man'>
      <img className='head' id='head' alt='head' src={head} />
      <img className='arm-left' id='arm1' alt='arm1' src={arm1} />
      <img className='arm-left' id='arm2' alt='arm2' src={arm2} />
      <img className='arm-right' id='arm3' alt='arm3' src={arm3} />
      <img className='arm-right' id='arm4' alt='arm4' src={arm4} />
    </div>
  );
}

/*
 *    Counter Component
 *      Set the pizzas that have to be eaten
 */
export class Counter extends Component {
  constructor(props){
    super(props);
    
    this.minimum_pizza = 3;
    this.maximum_pizza = 20;
    this.random_number_pizza = Math.round(Math.random() * (this.maximum_pizza - this.minimum_pizza)) + this.minimum_pizza;
    
    this.props.maximum_pizza(this.random_number_pizza);
  }
  
  render() {
    return (
      <div id='pizza_number'>
        <span id='counter_pizza_number'>{this.props.counter_pizza}</span>
        <span id='fix_counter_pizza_number'>/{ this.random_number_pizza }</span>
      </div>
    );
  }
}

/*
 *    Timer Component
 *      Set the timer of the game
 */
export class Timer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      seconde:59,
      milliseconde: 59
    }
    
    this.timer = this.timer.bind(this);
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer, 10);
  }
  
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  
  /*
   *    Update the timer render
   *      Callback To View2 if the time is over
   */
  timer() {
    this.setState({
      milliseconde: this.state.milliseconde - 1
    });
    
    if(this.state.seconde < 1 && this.state.milliseconde < 1) {
      this.setState({milliseconde: '00'});
      clearInterval(this.intervalId);
      
      this.props.timeOver();
    }
    else if(this.state.milliseconde === 0)
    {
      this.setState({
        milliseconde: 59,
        seconde: this.state.seconde - 1
      });
    }
  }
  
  render() {
    return (
      <div id='countdown'>
        <div id='countdown_text'>Time Left: </div>
          <div id='countdown_value'>
            <div id='countdown_seconde'>{ this.state.seconde }</div>
            <div id='countdown_milliseconde'>.{ this.state.milliseconde }</div>
          </div>
      </div>
    );
  }
}