import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import Tappable from 'react-tappable';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

/* ----------  Components  ---------- */
import FormField from './FormField';

/* ----------  Styles  ---------- */
const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PasswordStrength = styled.span`
  position: absolute;
  width: 0;
  height: 4px;
  bottom: -8px;
  left: 0;
  background: transparent;
  transition: all 300ms ease-in-out;

  /* TODO: Fix animation, replace width with scale3d */
  &[data-score="null"]{
    width: 0;
    background-color: red;
  }

  &[data-score="0"]{
    width: 5%;
    background-color: #F44336;
  }
  &[data-score="1"]{
    width: 25%;
    background-color: #F44336;
  }
  &[data-score="2"]{
    width: 50%;
    background-color: #FFEB3B;
  }
  &[data-score="3"]{
    width: 75%;
    background-color: #4CAF50;
  }
  &[data-score="4"]{
    width: 100%;
    background-color: #4CAF50;
  }
`;

const PasswordToggle = styled(Tappable)`
  cursor: pointer;
  position: absolute;
  bottom: 11px;
  height: 16px;
  right: 0;
  background: #cccccc;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: .8em;
`;

class Password extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool
  }

  static defaultProps = {
    required: false,
    onChange: null
  }

  state = {
    type: 'password',
    score: 'null'
  }

  render() {
    return (
      <Container>
        <FormField
          type={this.state.type}
          autoComplete="current-password"
          {...this.props}
          onChange={this.checkPasswordStrength} />
        {this.renderInfo()}
        <PasswordToggle onTap={this.handleShowHide}>
          {this.state.type === 'text' ? 'Hide' : 'Show'}
        </PasswordToggle>
        <PasswordStrength data-score={this.state.score} />
      </Container>
    );
  }

  renderInfo() {
    if (this.props.required) {
      return null;
    }

    return <small>Optional</small>;
  }

  handleShowHide = (e) => {
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    })
  }

  checkPasswordStrength = (e) => {
    if (e.target.value === '') {
      this.setState({
        score: 'null'
      })
    }
    else {
      var pw = zxcvbn(e.target.value);
      this.setState({
        score: pw.score
      });
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
}
export default Password;
