/* ----------  External Libraries  ---------- */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition, config } from 'react-spring';
import { animated } from 'react-spring';

/* ----------  Components  ---------- */
import ListItem from '../Listitem/ListItem.jsx';

/* ----------  Styles  ---------- */
import './List.scss';

class List extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    items: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    withInfo: PropTypes.bool,
    styles: PropTypes.object
  };

  static defaultProps = {
    withInfo: false
  };

  /* ----------  React Lifecycle  ---------- */
  render() {
    const classes = classNames({
      'list-container': true,
      'list-container-active': this.props.items.length > 0,
      'list-container-large': this.props.items.length >= 4
    });

    const items = this.props.items;
    const height = this.props.withInfo ? '82px' : '48px';

    return (
      <Fragment>
        <animated.section className={classes} style={this.props.styles}>
          <div style={{ width: '100%' }}>
            <Transition
              native
              config={config.gentle}
              items={items}
              keys={item => item.name || item.family}
              from={{ opacity: 0, transform: 'translate3d(0%,100%,0)' }}
              enter={{
                opacity: 1, transform: 'translate3d(0%,0%,0)',
                height: height
              }}
              leave={{ opacity: 0, transform: 'translate3d(-100%,0%,0)', height: 0, padding: 0 }}>
              {
                items.map((item, index) => styles =>
                  <ListItem
                    withInfo={this.props.withInfo}
                    styles={styles}
                    file={item}
                    key={item.family}
                    onRemove={() => this.handleFileRemove(index)} />
                )
              }
            </Transition>
          </div>
        </animated.section>
        <div
          ref={(el) => {
            this.filesEnd = el;
          }}
        />
      </Fragment>
    );
  }

  renderItems() {
    return this.props.items.map((file, index) => {
      return (
        <ListItem file={file} key={`file-${index}`} onRemove={() => this.handleFileRemove(index)} classes={`animated animate-in slide-in-up duration-${index + 1}`} />
      );
    })
  }

  handleFileRemove = index => {
    this.props.onRemove(index);
  }

  scrollToBottom() {
    this.filesEnd.scrollIntoView({ behavior: 'smooth' });
  }
}

export default List;
