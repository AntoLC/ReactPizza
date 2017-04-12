// @flow
import React, { Component } from 'react';
import {
  StaticCanvas,
  CloudStorage,
} from 'aq-miniapp';
import {
  View1,
  View2,
  View3,
} from './js';

import type { Output } from './Types';

type Props = {
  cloudStorageClient: CloudStorage,
  id?: string,
  data? : Object,
  mode: 'preview' | 'join'
}

export default class View extends Component {
  state: {
    currentPage: number,
    output: Output,
    data: ?Object,
    mode: 'preview' | 'join',
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      output: {},
      data: props.data,
      mode: props.mode
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    // if(!nextProps.id) {
    //   this.setState({data: nextProps.data, currentPage: 1});
    // }
  }

  _onView1Click() {
    this.setState({currentPage: 2});
  }

  _onView2Click(output: Output) {
    this.setState({currentPage: 3, output: output});
  }

  _onView3Click() {
    this.setState({currentPage: 2});
  }

  render() {
    // const data = this.state.data;
    const height = window.innerWidth;
    const width = window.innerHeight;
    let render = <StaticCanvas width={width} height={height}/>

    // if (data) {
      // let source = data.source;
      // if (this.props.additionalInfo && this.props.additionalInfo.passSource) {
      //   source = this.props.additionalInfo.passSource;
      // }
      switch (this.state.currentPage) {
        case 1:
          render = <View1 onClick={this._onView1Click.bind(this)}/>
          break;
        case 2:
          render = <View2 onClick={this._onView2Click.bind(this)}/>
          break;
        case 3:
          render = <View3 output={this.state.output} onClick={this._onView3Click.bind(this)}/>
          break;
        default:
          break;
      }
    // }
    return (
      <div className='container'>
        {render}
      </div>
    );
  }
}
