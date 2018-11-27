/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

/* ----------  Components  ---------- */
import Checkbox from '../Checkbox/Checkbox.jsx';


/* ----------  Styles  ---------- */
import './Option.scss';

class Option extends Component {
  /* ----------  React Configuration  ---------- */

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    // selectedFonts: PropTypes.array.isRequired,
    innerProps: PropTypes.object
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    const font = this.props.selectedFonts.find(el => el.family === this.props.label);
    let checked = false;
    if (font) {
      checked = true;
    }

    return (
      <div styleName={checked ? 'option active' : 'option'} {...this.props.innerProps}>
        <p styleName='label'>
          {this.props.label}
        </p>
        <Checkbox checked={checked} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // selectedFonts: state.Fonts.selectedFonts
  };
}

export default connect(
  mapStateToProps,
)(Option);
