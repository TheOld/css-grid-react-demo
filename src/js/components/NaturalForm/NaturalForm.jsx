// @flow

/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* ----------  Relative Imports  ---------- */
import TypeformField from '../FormField/TypeformField';

/* ----------  Actions  ---------- */

/* ----------  Styles  ---------- */

class NaturalForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    activeFieldId: PropTypes.string.isRequired
  }

  render() {
    const { activeFieldId, form } = this.props;

    if (form.fields && activeFieldId !== '0') {
      const field = form.fields.find(field => field.id === activeFieldId);

      return (
        <form className={this.props.className}>
          <TypeformField field={field} />
        </form>
      )
    }

    // Let's render the loading component while we fetch the data
    return (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = state => ({
  form: state.NaturalForm.form,
  activeFieldId: state.NaturalForm.activeFieldId
});

export default connect(
  mapStateToProps,
)(NaturalForm);
