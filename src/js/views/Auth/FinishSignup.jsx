import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

/* ----------  Services  ---------- */


/* ----------  Actions  ---------- */
import {
  updateCompanyName,
  updateDisplayName,
  toggleIsAgency,
  setPassword,
} from '../../actions/AuthActions';

/* ----------  Components  ---------- */
import Button from '../../components/Button/Button';
import Password from '../../components/FormField/Password';
import FormField from '../../components/FormField/FormField';
import { animated } from 'react-spring';



class FinishSignup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <animated.div style={this.props.styles} className="content-wrapper col-start-11 col-end-18">
        <FormField type="text" id="company-name" value={user.companyName} onChange={this.handleChange} required title="Company name" />
        <FormField id="is-agency" type="checkbox" value={user.isAgency} onChange={this.handleChange} title="Are you an agency representing a client?" />
        <FormField type="text" id="name" value={user.displayName || ''} onChange={this.handleChange} required title="Full name" />
        <Password title="Password" value={user.password} onChange={this.handleChange} id="signup-password" required />
        <Button text="Create my account" component="button" className="button" type="button" onClick={this.handleSubmit} />
      </animated.div>
    );
  }

  handleChange = (e) => {
    console.log("​FinishSignup -> handleChange -> e", e)
    const { authActions } = this.props;
    const target = e.target;
    const value = target.value;

    switch (target.id) {
      case 'company-name':
        authActions.updateCompanyName(value);
        break;
      case 'is-agency':
        authActions.toggleIsAgency(target.checked);
        break;
      case 'name':
        authActions.updateDisplayName(value);
        break;
      case 'signup-password':
        authActions.setPassword(value);
        break;
      default:
        break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { user } = this.props;

    // TODO: Update user data on the server
    const userData = {
      company_name: user.companyName,
      user_id: user.uid,
      is_agency: user.isAgency
    };

    this.props.dispatch(push('/'))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.Auth.User
  };
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  authActions: bindActionCreators(
    {
      updateCompanyName,
      updateDisplayName,
      setPassword,
      toggleIsAgency,
    }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishSignup);
