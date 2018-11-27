//@flow

import React, { Component, Fragment } from 'react';

/* ----------  Type Imports  ---------- */
import type { Field } from 'NaturalForm';

/**
 * Define the type of props we should expect.
 */
type Props = {
  field: Field,
};


class TypeformField extends Component<Props> {

  /**
   * Renders the component HTML.
   */
  render(): React$Element<*> {
    const { field } = this.props;
    return (
      <Fragment>
        <label htmlFor={field.id}>{field.title.replace(/\*/g, '')}</label>
        <input {...field} type={this.convertType(field.type)} {...field.validations} />
      </Fragment>
    );
  }

  /**
   * Will convert the non-standard types from Typeform to a standard equivalent.
   * @param {string} type - The field type as set by Typeform.
   * @returns {string} type - The standard HTML type.
   * @memberof FormField
   */
  convertType = (type: string) => {
    switch (type) {
      case 'short_text':
      default:
        return 'text';
    }
  }
}

export default TypeformField;
