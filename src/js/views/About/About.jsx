import React, { Component } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

const Container = styled(animated.section)`
  background-color: ${props => props.theme.backgroundColor};;
`;

class About extends Component {
  render() {
    return (
      <Container style={this.props.styles}>
        <h1>About page</h1>
      </Container>
    );
  }
}

export default About;
