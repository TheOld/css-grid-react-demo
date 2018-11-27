import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

/* ----------  Services  ---------- */


/* ----------  Actions  ---------- */
import { updateEmail, setUser } from '../../actions/AuthActions';

/* ----------  Components  ---------- */
import Button from '../Button/Button';

import FormField from '../FormField/FormField';

class SignupForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <h2>Sign up</h2>
        <FormField title="Work email address" type="email" id="email" value={user.email} onChange={this.handleEmailChange} />
        <Button text="Continue" component="button" className="button" type="button" onClick={this.handleSubmit} />
      </Fragment>
    );
  }

  /**
   * This event will update the user.email property on the store
   *
   * @memberof SignupForm
   */
  handleEmailChange = (e) => {
    const { authActions } = this.props;
    const value = e.target.value;
    authActions.updateEmail(value);
  }

  /**
   * This will submit the signup form
   *
   * @memberof SignupForm
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props;
    // TODO: create a user using the email link method

    // Redirect to the "thanks" page
    setTimeout(() => {
      this.props.dispatch(push('/info'));
    }, 2000);
  }
}

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(
    {
      updateEmail,
      setUser
    }, dispatch),
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
)(SignupForm);
