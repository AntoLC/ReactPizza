// @flow
import React, { Component } from 'react';
import type { Output } from '../Types';

// Import component to be developed as required by specs document here
// import Comp from '../../components/Comp';

//Import relevant components as required by specs document here
import { Button } from 'aq-miniapp';

/* Import Assets as required by specs document
ex.
import asset from '../../assets/asset.png';
*/

// Import CSS here
import '../css/View2.css';

/* Define constants here

ex.
const MY_CONSTANT = 42;
*/

export type Props = {
  onClick: (Output) => void
};

export class View2 extends Component {

  item: any;

  state: {
    output: Output
  }

  constructor(props: Props){
    super(props);

    this.state = {
      output: {}
    }
  }

  render() {
    return (
      <div className="viewContainer justifySpaceAround">
        {/* TODO: insert additional assets here as required be the specs document */}
        <Button title="Done" onClick={() => this.props.onClick(this.state.output)}/>
      </div>
    )
  }
}
