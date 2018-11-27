/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

/* ----------  Components  ---------- */
import Button from '../Button/Button.jsx'

/* ----------  Actions  ---------- */
// import { setPage, setPreviousPage, setStage, setPreviousStage } from '../../actions/navigationActions';
// import { setGoingBack } from '../../actions/uiActions';

class Backbutton extends Component {
  /* ----------  React Configuration  ---------- */

  static propTypes = {
    page: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    previousPage: PropTypes.string.isRequired,
    // previousStage: PropTypes.string.isRequired,
    navActions: PropTypes.object.isRequired,
    uiActions: PropTypes.object.isRequired
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <Button
        modStyles="back"
        label="I've changed my mind."
        onClick={this.handleBack} />
    );
  }

  handleBack = () => {
    this.props.uiActions.setGoingBack(true);

    switch (this.props.page) {

      default:
        break;
    }

    setTimeout(() => {
      this.props.uiActions.setGoingBack(false);
    }, 300);
  }
}

const mapStateToProps = state => {
  return {
    page: state.Navigation.page,
    stage: state.Navigation.stage,
    previousPage: state.Navigation.previousPage,
    // previousStage: state.Navigation.previousStage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // navActions: bindActionCreators({
    //   setPage,
    //   setPreviousPage,
    //   setStage,
    //   setPreviousStage
    // }, dispatch),
    // uiActions: bindActionCreators({
    //   setGoingBack
    // }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Backbutton);
