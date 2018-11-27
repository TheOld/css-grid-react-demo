import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

/* ----------  Services  ---------- */


/* ----------  Actions  ---------- */
import { updateEmail, setUser, setPassword } from '../../actions/AuthActions';

/* ----------  Components  ---------- */
import Button from '../../components/Button/Button';
import Password from '../../components/FormField/Password';
import FormField from '../../components/FormField/FormField';

/* ----------  Styled Components  ---------- */
const Container = styled(animated.section)`
  position: relative;
  grid-column: span 7 / 17;
  background-color: white;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
`;

const User = styled(FormField)`
  position: relative;
  margin-bottom: 0;
  z-index: 0;
`;

const SPassword = styled(Password)`
  position: relative;
  margin-bottom: 0;
  margin-top: -1px;
  z-index: 0;
`;

const SButton = styled(Button)`
  position: absolute;
  right: -56px;
  z-index: 2;
  top: 20px;
`;

const Checkbox = styled(FormField)`
  position: relative;
`;

class Login extends Component {
  //TODO: Init auth service
  static propTypes = {
    user: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,

  }

  render() {
    return (
      <Container style={this.props.styles}>
        <h2>Enter your details</h2>

        <Form onSubmit={this.handleLogin}>
          <User type="email" placeholder="email" required autoComplete="username" onChange={this.handleUserChange} />
          <SPassword placeholder="password" id="login-password" required onChange={this.handlePWChange} />
          <SButton type="submit" text="Login" onClick={this.handleLogin} className='button' />
          <Checkbox type="checkbox" id="remember-me" title="Remember me" onChange={this.handleRememberMe} />
          <Button text="Forgot password?" type="link" href="/forgot-password" className="button button-link" />
        </Form>
      </Container>
    );
  }

  handleUserChange = (e) => {
    const { authActions } = this.props;
    const value = e.target.value;
    authActions.updateEmail(value);
  }

  handlePWChange = (e) => {
    const { authActions } = this.props;
    const target = e.target;
    const value = target.value;

    authActions.setPassword(value);
  }

  handleRememberMe = () => {

  }

  handleLogin = (e) => {
    console.log("​Login -> handleLogin -> e", e)
    e.preventDefault();
    e.stopPropagation();

    const { user } = this.props;

    if (user.email && user.password) {
      // TODO: Sign in
      // TODO: Render feedback message for user
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(
    {
      updateEmail,
      setUser,
      setPassword
    }, dispatch),
});

const mapStateToProps = (state) => {
  return {
    user: state.Auth.User
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
