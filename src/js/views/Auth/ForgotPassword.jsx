import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <h2>Forgot password</h2>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(ForgotPassword);
