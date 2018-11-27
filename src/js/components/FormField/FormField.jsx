import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class FormField extends Component<Props> {

  /**
   * Renders the component HTML.
   */
  render() {
    return (
      <Container>
        {this.renderLabel()}
        <input {...this.props} onChange={this.handleChange} className={`field ${this.props.className}`} />
      </Container>
    );
  }

  renderLabel() {
    if (this.props.title) {
      return <label htmlFor={this.props.id}>{this.props.title}</label>;
    }

    return null;
  }

  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }
}

export default FormField;
