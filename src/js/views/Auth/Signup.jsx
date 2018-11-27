import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { animated } from 'react-spring';

/* ----------  Services  ---------- */
// import FirebaseAuth from '../../services/Firebase/FirebaseAuth';

/* ----------  Components  ---------- */
import SignupForm from '../../components/Forms/SignupForm';
import FinishSignup from './FinishSignup';

class Signup extends Component {
  // constructor(props) {
  //   super(props);
  //   this.firebaseAuth = new FirebaseAuth();
  // }

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;

    return (
      <animated.section style={this.props.styles} className="content-wrapper col-start-11 col-end-18">
        {this.renderSignUpForm()}
      </animated.section>
    )
  }

  /**
   * Will render the simple singup form
   *
   * @returns {*} - SignupForm.
   * @memberof Signup
   */
  renderSignUpForm() {
    return (
      <SignupForm />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.Auth.User
  }
}

export default connect(
  mapStateToProps,
)(Signup);
