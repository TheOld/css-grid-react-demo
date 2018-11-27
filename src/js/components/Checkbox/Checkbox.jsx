/* ----------  External Libraries  ---------- */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';

/* ----------  Components  ---------- */
/* ----------  Icons  ---------- */
import CheckIcon from '../../../img/icons/check.svg';

/* ----------  Styles  ---------- */
import './Checkbox.scss';

class Checkbox extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string
  }

  static defaultProps = {
    checked: false,
    name: `_${Math.random().toString(36).substr(2, 9)}`,
    onChange: null
  }
  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <Fragment>
        <input type="checkbox" styleName="check" onChange={this.handleChange} checked={this.props.checked} name={this.props.name} id={this.props.name} />
        <Tappable onTap={this.handleChange}>
          <CheckIcon styleName="icon" />
        </Tappable>
      </Fragment>
    );
  }

  handleChange = () => {
    this.props.onChange();
  }
}

export default Checkbox;
