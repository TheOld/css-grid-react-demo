import React, { Component } from 'react';
import { animated } from 'react-spring';

class Info extends Component {
  render() {
    return (
      <animated.section style={this.props.styles}>
        <h1>Thank you!</h1>
      </animated.section>
    );
  }
}

export default Info;
