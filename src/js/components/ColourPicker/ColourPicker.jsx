/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { animated, Spring, config } from 'react-spring';
import { CustomPicker } from 'react-color';
import { Saturation, Hue } from 'react-color/lib/components/common';
import CustomPointer from '../CustomPointer/CustomPointer.jsx';
import convert from 'color-convert';

/* ----------  Components  ---------- */
import CheckboxWrapper from '../CheckboxWrapper/CheckboxWrapper.jsx';
import Button from '../Button/Button.jsx';

/* ----------  Actions  ---------- */
// import { setActiveColour, setPrimaryColour, setSecondaryColour, useStandardColours } from '../../actions/colourActions';
// import { setPage, setStage } from '../../actions/navigationActions';
// import {
//   updateEntry
// } from '../../actions/transactionDataActions';

import * as Colours from '../../types/colourTypes';
import * as Pages from '../../types/pageTypes';
import * as Stages from '../../types/stageTypes';

/* ----------  Styles  ---------- */
import './ColourPicker.scss';

class ColourPicker extends Component {
  /* ----------  React Configuration  ---------- */

  static propTypes = {
    activeColour: PropTypes.string.isRequired,
    color: PropTypes.object.isRequired,
    colourActions: PropTypes.object.isRequired,
    Entry: PropTypes.object.isRequired,
    Fonts: PropTypes.object.isRequired,
    hex: PropTypes.string.isRequired,
    hsl: PropTypes.object.isRequired,
    hsv: PropTypes.object.isRequired,
    navActions: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    primaryColour: PropTypes.string.isRequired,
    rgb: PropTypes.object.isRequired,
    secondaryColour: PropTypes.string.isRequired,
    styles: PropTypes.object,
    translatePicker: PropTypes.bool.isRequired,
    useStandardColours: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.primary = React.createRef();
    this.secondary = React.createRef();
  }

  componentDidMount() {
    this.primary.addEventListener('focus', this.handleInputSelection, false);
    this.secondary.addEventListener('focus', this.handleInputSelection, false);
  }

  componentWillUnmount() {
    this.primary.removeEventListener('focus', this.handleInputSelection, false);
    this.secondary.removeEventListener('focus', this.handleInputSelection, false);
  }

  /* ----------  React Lifecycle  ---------- */
  render() {
    return (
      <animated.div style={this.props.styles} styleName="root">
        {this.renderColorPicker()}
        {this.renderCheckbox()}
        {this.renderButton()}
      </animated.div>
    );
  }

  renderColorPicker() {

    let translate = 'translate3d(0,0%,0)';
    let opacity = 1;
    let position = 'relative';

    if (this.props.useStandardColours) {
      translate = 'translate3d(0,-100%,0)';
      opacity = 0;
    }

    return (
      <Spring
        native
        from={{ transform: 'translate3d(0,0%,0)', opacity: 0 }}
        to={{
          opacity: opacity,
          transform: translate,
          top: 0,
          width: '100%',
          zIndex: 5
        }}>
        {styles =>
          <animated.div style={{ ...styles, position }}>
            <Spring
              native
              config={{
                tension: 180,
                friction: 26,
                velocity: 60,
                overshootClamping: true
              }}
              from={{ transform: 'translate3d(0,-100%,0)', opacity: 0 }}
              to={{
                opacity: '1',
                transform: 'translated3d(0,0%,0)'
              }}>
              {styles =>
                <animated.div style={styles} styleName="saturation-wrapper">
                  <Saturation
                    {...this.props}
                    onChange={this.handleChange}
                    pointer={() => <CustomPointer styles={{ backgroundColor: this.props.hex }} />} />
                </animated.div>
              }
            </Spring>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
              <div styleName="active-color-circle" style={{
                backgroundColor: this.props.hex
              }
              }></div>
              <div styleName="hue-wrapper">
                <Hue
                  {...this.props}
                  onChange={this.handleChange}
                  pointer={() => <CustomPointer styles={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0' }} />}
                  styleName="hue-picker"
                />
              </div>
            </div>
            <div styleName="input-container">
              <Spring
                native
                from={{ transform: 'translate3d(0,100%,0)', opacity: 0 }}
                to={{
                  opacity: '1',
                  transform: 'translated3d(0,0%,0)'
                }}>
                {styles =>
                  <animated.div style={styles} styleName="input-wrapper" data-name="Primary colour">
                    <label htmlFor="primary-colour" styleName="hex-label">
                      Hex
                    </label>
                    <input
                      type="text"
                      id="primary-colour"
                      name="primary-colour"
                      styleName="input"
                      maxLength="7"
                      data-type={Colours.PRIMARY_COLOUR}
                      value={this.props.primaryColour}
                      onChange={event => this.handleInputChange(event)}
                      style={{ borderColor: this.props.primaryColour }}
                      ref={node => this.primary = node} />
                    <label htmlFor="primary-colour" styleName="title-label">
                      Primary colour
                    </label>
                  </animated.div>
                }
              </Spring>
              <Spring
                native
                from={{ transform: 'translate3d(0,100%,0)', opacity: 0 }}
                to={{
                  opacity: '1',
                  transform: 'translated3d(0,0%,0)'
                }}>
                {styles =>
                  <animated.div style={styles} styleName="input-wrapper" data-name="Secondary colour">
                    <label htmlFor="secondary-colour" styleName="hex-label">
                      Hex
                    </label>
                    <input
                      type="text"
                      id="secondary-colour"
                      name="secondary-colour"
                      styleName="input"
                      maxLength="7"
                      style={{ borderColor: this.props.secondaryColour }}
                      data-type={Colours.SECONDARY_COLOUR}
                      value={this.props.secondaryColour}
                      onChange={event => this.handleInputChange(event)}
                      ref={node => this.secondary = node} />
                    <label htmlFor="secondary-colour" styleName="title-label">
                      Secondary colour
                    </label>
                  </animated.div>
                }
              </Spring>
            </div>
          </animated.div>
        }
      </Spring>
    )
  }

  renderCheckbox() {
    let translate = 'translate3d(0,0%,0)';
    let opacity = 1;
    let position = 'relative';

    if (this.props.useStandardColours) {
      translate = 'translate3d(0,-400%,0)';
    }

    if (this.props.translatePicker) {
      translate = 'translate3d(0,100%,0)';
      position = 'absolute';
      opacity = 0;
    }

    return (
      <Spring
        native
        from={{ transform: 'translate3d(0,0%,0)' }}
        to={{
          transform: translate,
          opacity: opacity,
          position: position,
          marginTop: '2.5rem'
        }}>
        {styles =>
          <CheckboxWrapper
            checked={this.props.useStandardColours}
            isActive={this.props.useStandardColours}
            onChange={this.handleUseStandardColours}
            label="Use standard colours."
            info="Lorem ipsum dolor sit amet."
            name="use-standard-colour"
            styles={styles} />
        }
      </Spring>
    )
  }

  renderButton() {
    let sendTrans = 'translate3d(0,0,0)';

    if (this.props.useStandardColours) {
      sendTrans = 'translate3d(0,0,0)';
    }

    return (
      <div className="row-2">
        <Spring
          native
          config={config.stiff}
          from={{ transform: 'translate3d(0,100px,0)' }}
          to={
            {
              transform: sendTrans,
              marginTop: '-10px'
            }
          }
        >
          {styles =>
            <Button styles={styles} modStyles={this.props.useStandardColours ? "primary" : "primary arrow"} label={this.props.useStandardColours ? 'Done' : 'Next'} onClick={this.handleNext} />
          }
        </Spring>
      </div>
    )
  }

  handleNext = async () => {
    const {
      Fonts,
      transActions,
      navActions,
      Entry,
      primaryColour,
      secondaryColour,
      useStandardColours
    } = this.props;

    let colours = `colours - "use standard colours"`;
    let fonts = `fonts - "use standard font"`;
    const currentDesc = Entry.details.description;

    if (!Fonts.useStandardFont) {
      const fontList = [];

      // await Promise.all(
      //   Fonts.selectedFonts.map(async font => {
      //     fontList.push(font.files['regular'] || font.files['400']);
      //   })
      // );

      Fonts.selectedFonts.forEach(font => {
        fontList.push(font.files['regular'] || font.files['400']);
      });

      fonts = `fonts - ${fontList.join(", ")}`;
    }

    // We'll take the selected colours if the user didn't select to use standard
    if (!useStandardColours) {
      const primary = primaryColour;
      const secondary = secondaryColour;

      colours = `colours - ${[primary, secondary].toString()}`;
    }

    const description = `${currentDesc} - ${fonts} - ${colours}`;

    const udpatedEntry = await transActions.updateEntry(Entry.id, description);
    console.log('TCL: handleNext -> udpatedEntry', udpatedEntry);

    navActions.setStage(Stages.FINISH);
    navActions.setPage(Pages.SUCCESS);
  }

  handleInputSelection = (e) => {
    const target = e.target;
    const type = target.dataset.type;

    if (type !== this.props.activeColour) {
      if (type == Colours.PRIMARY_COLOUR) {
        this.props.colourActions.setActiveColour(Colours.PRIMARY_COLOUR);
      } else {
        this.props.colourActions.setActiveColour(Colours.SECONDARY_COLOUR)
      }
    }
  }

  handleUseStandardColours = () => {
    this.props.colourActions.useStandardColours(!this.props.useStandardColours);
  }

  handleInputChange = (event) => {

    const hexColour = event.target.value;

    if (this.props.activeColour === Colours.PRIMARY_COLOUR) {
      this.props.colourActions.setPrimaryColour(hexColour);
    } else {
      this.props.colourActions.setSecondaryColour(hexColour);
    }
  }

  handleChange = (color, event) => {
    const target = event.target;

    let hexColour = `#${convert.hsv.hex(color.h, color.s, color.v)}`;

    if (target.classList.contains('hue-horizontal')) {
      let newColor = color;
      const activeColour = this.props.activeColour === Colours.PRIMARY_COLOUR ? this.props.primaryColour : this.props.secondaryColour
      newColor.s = convert.hex.hsv(activeColour)[1];
      newColor.v = convert.hex.hsv(activeColour)[2];
      hexColour = `#${convert.hsv.hex(color.h, newColor.s, newColor.v)}`;
    }

    if (this.props.activeColour === Colours.PRIMARY_COLOUR) {
      this.props.colourActions.setPrimaryColour(hexColour);
    } else {
      this.props.colourActions.setSecondaryColour(hexColour);
    }

    this.props.onChange(color);
  };
}

const mapStateToProps = state => {
  // const currentHex = state.Colours.activeColour === Colours.PRIMARY_COLOUR ? state.Colours.primaryColour : state.Colours.secondaryColour;
  // const hsv = convert.hex.hsv(currentHex);
  // const hsl = convert.hex.hsl(currentHex);
  // const rgb = convert.hex.rgb(currentHex);

  // return {
  //   translatePicker: state.Colours.translatePicker,
  //   primaryColour: state.Colours.primaryColour,
  //   secondaryColour: state.Colours.secondaryColour,
  //   useStandardColours: state.Colours.useStandardColours,
  //   activeColour: state.Colours.activeColour,
  //   hsv: { h: hsv[0], s: hsv[1], v: hsv[2], a: 1 },
  //   rgb: { r: rgb[0], r: rgb[1], b: rgb[2], a: 1 },
  //   hsl: { h: hsl[0], s: hsl[1], l: hsl[2], a: 1 },
  //   hex: currentHex,
  //   color: { h: hsl[0], s: hsl[1], l: hsl[2], a: 1 },
  //   Fonts: state.Fonts,
  //   Entry: state.TransactionData.entry
  // };
}

const mapDispatchToProps = dispatch => {
  return {
    // colourActions: bindActionCreators({
    //   setActiveColour,
    //   setPrimaryColour,
    //   setSecondaryColour,
    //   useStandardColours
    // }, dispatch),
    // transActions: bindActionCreators({
    //   updateEntry
    // }, dispatch),
    // navActions: bindActionCreators({
    //   setPage,
    //   setStage
    // }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomPicker(ColourPicker));
