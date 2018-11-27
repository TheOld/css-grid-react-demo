import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* ----------  Components  ---------- */
import Button from '../Button/Button.jsx';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';

/* ----------  Types  ---------- */
// import * as Stages from '../../types/stageTypes';

/* ----------  Actions  ---------- */
// import { setLoading } from '../../actions/uiActions';
// import { setUploadList } from '../../actions/transactionDataActions';

/* ----------  Icons  ---------- */
import WarningIcon from '../../../img/icons/warning.svg';

/* ----------  Styles  ---------- */
import './fileUpload.scss';

const MAX_SIZE = 209715200;
const MIN_SIZE = 1024;

class FileUpload extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // showDialog: PropTypes.bool.isRequired,
    transActions: PropTypes.object.isRequired,
    UIActions: PropTypes.object.isRequired,
    uploadList: PropTypes.array.isRequired,
    whitelist: PropTypes.string.isRequired,
    withWrapper: PropTypes.bool,
    stage: PropTypes.string.isRequired,
    isReady: PropTypes.bool.isRequired
  };

  static defaultProps = {
    withWrapper: true
  }

  constructor(props) {
    super(props);
    this.addMoreButton = React.createRef();
    this.dropzone = React.createRef();
  }

  /* =============================================
    =              React Lifecycle              =
    ============================================= */
  render() {
    return (
      <Fragment>
        <section styleName={this.props.uploadList.length === 0 ? 'dropzone-wrapper active' : 'dropzone-wrapper'} className="row-1">
          {this.renderDZ()}
        </section>
        {this.renderAddMore()}
      </Fragment>
    );
  }

  // TODO: Move this to separate component
  renderDZ() {
    const defaultProps = {
      accept: this.props.whitelist,
      maxSize: MAX_SIZE,
      minSize: MIN_SIZE,
      multiple: true,
      onDragEnter: this.onDragEnter,
      onDropAccepted: this.onDropAccepted,
      onDropRejected: this.onDropRejected,
    };

    if (this.props.withWrapper) {
      return (
        <Dropzone
          {...defaultProps}
          styleName="dropzone"
          rejectClassName="dropzone-reject"
          ref={(node) => { this.dropzone = node }}
          disabled={!this.props.isReady}
          activeClassName="dropzone-active">
          <section styleName="dropzone-container">
            {this.renderCloud()}
            {this.renderUploadIcon()}
          </section>
          <p styleName="helper" className="animated slide-in-up duration-2 delay-3">
            {this.getUploadMessage()}
          </p>
        </Dropzone>
      );
    }

    return (
      <div styleName="dropzone-alt">
        <Dropzone {...defaultProps} rejectClassName="dropzone-reject"
          ref={(node) => { this.pureDropzone = node; }}
          activeClassName="dropzone-active" />
      </div>
    )
  }

  // TODO: Move this to separate component
  renderAddMore() {
    // FIXME: Maybe we don't need conditions here
    if (true) {
      const multiple = this.props.uploadList.length >= 3 ? 'multiple' : '';

      return (
        <Spring
          native
          from={{ transform: 'translate3d(-100%,0,0)' }}
          to={{
            transform: this.props.uploadList.length > 0 ? 'translate3d(0%,0,0)' : 'translate3d(-100%,0,0)',
            opacity: this.props.uploadList.length > 0 ? '1' : '0'
          }}>
          {styles =>
            <Button styles={styles} modStyles={this.props.uploadList.length > 0 ? `link link-add visible ${multiple}` : 'link'} label="Add files" onClick={() => this.dropzone.open()} classes='delay-4' />
          }
        </Spring>
      )
    }

    return null;
  }

  // TODO: Move this to separate component
  renderErrorLabel(file) {
    if (file.rejected && file.tooLarge) {
      return (
        <Fragment>
          <p styleName="error-label">
            {` - File size exceeds limit (200MB).`}
          </p>
          <p styleName="error-label">
            {` - File not supported or of unrecognised type.`}
          </p>
        </Fragment>
      );
    }

    if (file.tooLarge) {
      return <p styleName="error-label">
        {` - File size exceeds limit (200MB).`}
      </p>;
    }

    if (file.rejected) {
      return <p styleName="error-label">
        {` - File not supported or of unrecognised type.`}
      </p>;
    }

    return null;
  }

  // TODO: Use SVG file
  renderCloud() {
    return (
      <svg styleName="cloud-icon" className="cloud-icon animated slide-in-down duration-2 delay-3 " width="141" height="80" xmlns="http://www.w3.org/2000/svg">
        <path d="M122.171 78.731c10.232-1.521 18.089-10.448 18.089-21.23 0-11.849-9.49-21.457-21.195-21.457h-.092c.06-.61.092-1.225.092-1.85 0-10.01-8.018-18.128-17.906-18.128-5.385 0-10.202 2.416-13.484 6.224C82.415 9.966 70.304 1.34 56.2 1.34c-18.93 0-34.279 15.538-34.279 34.704v.015c-11.565.166-20.89 9.696-20.89 21.443 0 11.85 9.49 21.455 21.195 21.455h51.891" stroke="#5D617A" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // TODO: Use SVG file
  renderUploadIcon() {
    return (
      <svg styleName="upload-icon" className="upload-icon animated slide-in-down duration-2 delay-3" width="34" height="35" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
          <path d="M33.264 17.56c0 8.864-7.151 16.053-15.97 16.053-8.818 0-15.968-7.189-15.968-16.054 0-8.866 7.15-16.053 15.968-16.053 8.819 0 15.97 7.187 15.97 16.053z" stroke="#5D617A" strokeWidth="1.5" styleName="upload-border" />
          <path stroke="#4A6EE2" strokeWidth="2" d="M11.972 15.266l5.325-5.351 5.321 5.351M17.295 10.68v13.76" styleName="upload-arrow" />
        </g>
      </svg>
    );
  }

  renderWarningIcon() {
    return (
      <WarningIcon />
    );
  }

  onDropAccepted = fileList => {
    this.props.UIActions.setLoading(true);

    let acceptedList = [];

    fileList.forEach(element => {
      const sig = `${element.size}${element.name}`;

      if (!this.props.uploadList.find(el => el.signature === sig)) {
        element.progress = 0;// eslint-disable-line react/prop-types
        element.signature = sig;// eslint-disable-line react/prop-types
        element.description = '';// eslint-disable-line react/prop-types
        element.S3URL = '';// eslint-disable-line react/prop-types
        element.fileName = element.name;// eslint-disable-line react/prop-types

        acceptedList.push(element);
      }
    });

    if (acceptedList.length > 0) {
      this.props.transActions.setUploadList(acceptedList);
    }
  };

  onDropRejected = fileList => {
    let rejectedList = [];
    fileList.forEach(async fileItem => {
      const sig = `${fileItem.size}${fileItem.name}`;

      if (!this.props.uploadList.find(el => el.signature === sig)) {
        const item = fileItem;

        item.rejected = true;
        item.tooLarge = fileItem.size > MAX_SIZE;
        item.signature = sig;

        rejectedList.push(fileItem);
      }
    });
  };

  getUploadMessage() {
    switch (this.props.stage) {
      // case Stages.LOGO:
      //   return 'Drag and drop your logo here or click to upload.';
      // case Stages.FONT_UPLOAD:
      //   return 'Drag and drop your fonts here or click to upload.';
      // case Stages.SINGLE_IMAGE:
      default:
        return 'Drag and drop your image here or click to upload.';
    }
  }

  isUploading(progress) {
    if (progress > 0 && progress < 100) {
      return true;
    }
    return false;
  }

  scrollToBottom() {
    this.filesEnd.scrollIntoView({ behavior: 'smooth' });
  }
}

const mapStateToProps = state => {
  return {
    // loading: state.UI.loading,
    // // showDialog: state.UI.showDialog,
    // stage: state.Navigation.stage,
    // uploadList: state.TransactionData.uploadList,
    // whitelist: state.UI.whitelist,
    // isReady: state.UI.isReady
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UIActions: bindActionCreators({
    //   setLoading
    // }, dispatch),
    // transActions: bindActionCreators({
    //   setUploadList
    // }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileUpload);
