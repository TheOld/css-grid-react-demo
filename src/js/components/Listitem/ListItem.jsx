/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import Tappable from 'react-tappable';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

/* ----------  Components  ---------- */

/* ----------  Styles  ---------- */
import './ListItem.scss';

/* ----------  Icons  ---------- */
import CrossIcon from '../../../img/icons/cross.svg';

class ListItem extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    file: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    classes: PropTypes.string,
    styles: PropTypes.object,
    withInfo: PropTypes.bool
  }

  static defaultProps = {
    withInfo: false
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <animated.div styleName={this.props.withInfo ? "list-item" : "list-item list-item-alt"} className={this.props.classes} style={this.props.styles}>
        <div styleName="content-wrapper">
          <p styleName="name" className="animated delay-2 animate-in slide-in-up">
            {this.props.file.name || this.props.file.family}
          </p>
          {this.renderInfo()}
        </div>
        <Tappable onTap={this.handleItemRemove} styleName="remove">
          <CrossIcon />
        </Tappable>
      </animated.div>
    );
  }

  renderInfo() {
    if (!this.props.withInfo) {
      return null;
    }
    return (
      <div styleName="info">
        <small className="animated delay-3 animate-in slide-in-up duration-3">
          {this.formatBytes(this.props.file.size)}
        </small>
        <small className="animated delay-4 animate-in slide-in-left duration-4">
          {` | `}
          {this.getType()}
        </small>
      </div>
    )
  }

  handleItemRemove = () => {
    this.props.onRemove();
  }

  getType() {
    switch (this.props.file.type) {
      case 'image/png':
        return 'png';
      case 'image/jpg':
        return 'jpg';
      case 'image/jpeg':
        return 'jpg';
      case 'image/gif':
        return 'gif';
      case 'image/svg+xml':
        return 'svg';
      case 'video/avi':
        return 'avi';
      case 'video/mp4':
        return 'mp4';
      case 'text/css':
        return 'css';
      case 'application/csv':
        return 'csv';
      case 'application/zip':
        return 'zip';
      case 'application/pdf':
        return 'pdf';
      case 'text/txt':
        return 'txt';
      case 'text/html':
        return 'html';
      default:
        return 'file';
    }
  }

  // FIXME: Move this to utils
  formatBytes(bytes, decimals) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const exp = k ** i;
    return `${parseFloat((bytes / exp).toFixed(dm))} ${sizes[i]}`;
  }
}


export default ListItem;
