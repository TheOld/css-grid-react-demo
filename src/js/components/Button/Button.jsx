// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tappable from 'react-tappable';
import { push } from 'connected-react-router';

/* ----------  Type Imports  ---------- */
import type { Button as ButtonType } from 'FormControls';

/**
 * Define the type of props we should expect.
 */
type Props = {
  button: ButtonType,
};

/* ----------  Styled Components  ---------- */
const CButton = styled(Tappable)`
  border-color: ${props => props.theme.button.bd};
  background-color: ${props => props.theme.button.bg};
`;

class Button extends Component<Props> {
  /**
   * Renders the component HTML.
   */
  render(): React$Element<*> {
    return (
      <CButton
        onTap={this.handleTap}
        component={this.props.type === 'link' ? 'a' : 'button'}
        className={this.props.className}>
        {this.props.text}
      </CButton>
    );
  }

  handleTap = (e) => {
    if (this.props.type !== 'link') {
      this.props.onClick(e);
    } else {
      this.props.dispatch(push(this.props.href));
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

const mapStateToProps = (state) => {
  return {
    user: state.Auth.User
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
