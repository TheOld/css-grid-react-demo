import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Transition, animated } from 'react-spring';
import styled from 'styled-components';

/* ----------  Services  ---------- */


import { setUser } from '../actions/AuthActions';

/* ----------  Views  ---------- */
import Home from '../views/Home/Home';
import About from '../views/About/About';
import Info from '../views/Info/Info';

/* ----------  Auth Views  ---------- */
import Signup from '../views/Auth/Signup';
import Login from '../views/Auth/Login';
import FinishSignup from '../views/Auth/FinishSignup';

/* ----------  Theme  ---------- */
import defaultTheme from '../ui/Themes/default';
import darkTheme from '../ui/Themes/dark';

/* ----------  Styled components  ---------- */
const Container = styled(animated.section)`
  background-color: ${props => props.theme.backgroundColor};;
`;

class App extends Component {
  // TODO: init auth services

  static propTypes = {
    location: PropTypes.object.isRequired,
    theme: PropTypes.string.isRequired,
    authActions: PropTypes.object.isRequired
  }

  componentWillMount() {
    // TODO: Listen to user state change event and propagate data
    // document.addEventListener('authstatechange', this.handleUserStateChange);
  }

  componentDidMount() {
    //TODO: get user data if any
  }

  componentWillUnmount() {
    // document.removeEventListener('authstatechange', this.handleUserStateChange);
  }

  render() {
    let theme = defaultTheme;

    if (this.props.theme === 'dark') {
      theme = darkTheme;
    }

    return (
      <ThemeProvider theme={theme}>
        <Transition
          native
          keys={this.props.location.key}
          from={{ transform: 'translateY(100px)', opacity: 0, position: 'absolute' }}
          enter={{ transform: 'translateY(0px)', opacity: 1, position: 'relative' }}
          leave={{ transform: 'translateY(100px)', opacity: 0, position: 'absolute' }}
        >
          {item => styles => (
            <Container style={styles} className="grid">
              <Switch location={this.props.location}>
                <Route exact path="/" render={() => <Home styles={styles} />} />
                <Route exact path="/about" render={() => <About styles={styles} />} />
                <Route exact path="/signup" render={() => <Signup styles={styles} />} />
                <Route exact path="/finish-signup" render={() => <FinishSignup styles={styles} />} />
                <Route exact path="/info" render={() => <Info styles={styles} />} />
                <Route exact path="/login" render={() => <Login styles={styles} />} />
              </Switch>
            </Container>
          )}</Transition>
      </ThemeProvider>
    );
  }

  /**
   * Handles the user data state change event and update the store
   *
   * @memberof App
   */
  handleUserStateChange = (e) => {
    const data = e.detail;
    this.props.authActions.setUser(data);
  }
}

const mapStateToProps = (state) => ({
  location: state.router.location,
  theme: state.UI.theme,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators({ setUser }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
