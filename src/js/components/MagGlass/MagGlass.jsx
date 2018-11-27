/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import { components } from 'react-select';

/* ----------  Icons  ---------- */
import MagglassIcon from '../../../img/icons/mag-glass.svg';

/* ----------  Styles  ---------- */
import './MagGlass.scss';

class MagGlass extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    styles: PropTypes.object
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <animated.span style={this.props.styles} >
        <components.DropdownIndicator {...this.props}>
          <MagglassIcon />
        </components.DropdownIndicator>
      </animated.span>
    );
  }
}

export default MagGlass;
