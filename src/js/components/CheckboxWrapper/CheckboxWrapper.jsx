/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';

/* ----------  Components  ---------- */
import Checkbox from '../Checkbox/Checkbox.jsx';

/* ----------  Styles  ---------- */
import './CheckboxWrapper.scss';

class CheckboxWrapper extends Component {
  /* ----------  React Configuration  ---------- */

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <animated.div style={this.props.styles} styleName="checkbox-wrapper">
        <div styleName="inner-wrapper">
          <Checkbox name={this.props.name} id={this.props.name} checked={this.props.checked} onChange={this.handleChange} />
          <label htmlFor={this.props.name} styleName={this.props.isActive ? 'label label-active' : 'label'}>
            {this.props.label}
          </label>
        </div>
        <small styleName={this.props.isActive ? 'info info-active' : 'info'}>
          {this.props.info}
        </small>
      </animated.div>
    );
  }

  handleChange = () => {
    this.props.onChange();
  }
}

export default CheckboxWrapper;
