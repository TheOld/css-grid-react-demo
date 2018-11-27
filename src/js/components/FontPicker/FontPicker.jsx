/* ----------  External Libraries  ---------- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { animated, config, Spring } from 'react-spring';
import AsyncPaginate from 'react-select-async-paginate';

/* ----------  Actions  ---------- */
// import {
//   fetchFonts,
//   addFont,
//   removeFontByIndex,
//   useStandardFont
// } from '../../actions/fontsActions';
// import { translateSelect, resetSelectPosition, setSelectClosed, setSelectOpen } from '../../actions/uiActions';
// import { setStage, setPage } from '../../actions/navigationActions';

/* ----------  Types  ---------- */
// import * as Pages from '../../types/pageTypes';
// import * as Stages from '../../types/stageTypes';

/* ----------  Components  ---------- */
import Option from '../Option/Option.jsx';
import CheckboxWrapper from '../CheckboxWrapper/CheckboxWrapper.jsx';
import Button from '../Button/Button.jsx';
import DropdownIndicator from '../MagGlass/MagGlass.jsx';
import List from '../List/List.jsx';

/* ----------  Styles  ---------- */
import './FontPicker.scss';

class FontPicker extends Component {
  /* ----------  React Configuration  ---------- */
  static propTypes = {
    fonts: PropTypes.array.isRequired,
    fontsActions: PropTypes.object.isRequired,
    fontSet: PropTypes.array.isRequired,
    isSelectOpen: PropTypes.bool.isRequired,
    maxFonts: PropTypes.number.isRequired,
    navActions: PropTypes.object.isRequired,
    selectedFonts: PropTypes.array.isRequired,
    translateSelect: PropTypes.bool.isRequired,
    uiActions: PropTypes.object.isRequired,
    useStandardFont: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.select = React.createRef();
  }

  /* ----------  React Lifecycle  ---------- */

  render() {
    let translate = 'translate3d(0, 94px, 0)';

    if (this.props.selectedFonts.length > 0 || this.props.translateSelect) {
      translate = 'translate3d(0, 0, 0)';
    }

    return (
      <animated.div styleName="root" style={
        {
          transform: translate,
        }} >
        <section className="row-1" style={{ width: '100%' }}>
          {this.renderSelect()}
          {this.renderCheckbox()}
          {this.renderSelectedFontList()}
        </section>
        {this.renderButtons()}
      </animated.div>
    );
  }

  renderSelect() {
    const selectStyles = {
      container: (base) => (
        {
          ...base,
          padding: 0,
          zIndex: 10,
          position: 'relative'
        }
      ),
      control: (base) => ({
        ...base,
        borderRadius: '34px',
        padding: '0',
        background: "#fcfcfc",
        color: '#4a6ee2',
        borderColor: '#CBCCD9',
        height: '41px',
        boxShadow: 'none',
        zIndex: 10,
        fontSize: '13px',
        color: '#4A6EE2',
        lineHeight: '18px',
        '&:hover': {
          borderColor: '#4A6EE2',
          boxShadow: 'none',
          cursor: 'pointer'
        },
        '&:focus': {
          borderColor: '#4A6EE2',
          boxShadow: 'none'
        }
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9,
        borderTop: 0,
        borderRight: '1px solid #4A6EE2',
        borderBottom: '1px solid #4A6EE2',
        borderLeft: '1px solid #4A6EE2',
        borderRadius: 0,
        margin: '-3px 14px 0',
        width: '91%',
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: 'none',
      }),
      valueContainer: (base) => (
        {
          ...base,
          background: 'transparent',
          color: 'white',
          width: '100%',
          paddingLeft: '34px',
        }
      ),
    };

    let translate = 'translate3d(0,0%,0)';
    let opacity = 1;
    let position = 'relative';

    if (this.props.useStandardFont) {
      translate = 'translate3d(0,-100%,0)';
      opacity = 0;
    }

    if (this.props.translateSelect) {
      translate = 'translate3d(0,-122px,0)';
      position = 'absolute';
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
            <p styleName="title">
              Search on Google Fonts
            </p>
            <AsyncPaginate
              ref={(node) => { this.select = node }}
              maxMenuHeight={230}
              placeholder="Select or search"
              closeMenuOnSelect={false}
              components={{ Option, DropdownIndicator }}
              isDisabled={this.props.fonts.length === 0}
              loadOptions={this.loadOptions}
              captureMenuScroll
              onChange={this.handleFontChange}
              onFocus={this.handleSelectFocus}
              onMenuScrollToBottom={this.loadOptions}
              onBlur={(e) => this.handleSelectBlur(e)}
              blurInputOnSelect={false}
              defaultOptions={true}
              cacheOptions={true}
              styles={selectStyles} />
            <small styleName="helper">
              Select up to 2 font families.
            </small>
          </animated.div>

        }
      </Spring>
    )
  }

  // TODO: Move to component
  // TODO: Create "springed" component that wraps components with react-spring
  renderCheckbox() {
    let translate = 'translate3d(0,0%,0)';
    let opacity = 1;
    let position = 'relative';
    let marginTop = '80px';

    if (this.props.useStandardFont) {
      translate = 'translate3d(0,-100%,0)';
      marginTop = '0';
    }

    if (this.props.translateSelect) {
      translate = 'translate3d(0,100%,0)';
      position = 'absolute';
      marginTop = '0';
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
          marginTop: marginTop
        }}>
        {styles =>
          <CheckboxWrapper
            checked={this.props.useStandardFont}
            isActive={this.props.useStandardFont}
            onChange={this.handleUseStandardFont}
            label="Use standard font"
            info="We'll use our standard font Helvetica."
            name="use-standard-font"
            styles={styles} />
        }
      </Spring>
    )
  }

  // TODO: Move this to component
  renderSelectedFontList() {
    let translate = 'translate3d(0,1000px,0)';
    let opacity = 0;
    let pos = 'relative';
    let height = '240px';

    if (this.props.selectedFonts.length > 0) {
      translate = 'translate3d(0,0,0)';
      opacity = 1;
    }

    if (this.props.isSelectOpen) {
      translate = 'translate3d(0px, 188px, 0px)';
      // height = '144px';
    }

    if (this.props.useStandardFont) {
      pos = 'absolute';
    }

    return (
      <Spring
        native
        to={{
          opacity,
          transform: translate
        }}
      >
        {styles =>
          <animated.section style={{ ...styles, position: pos }} styleName="font-list-wrapper">
            <p styleName="font-list-title">
              Selected fonts
            </p>
            <List items={this.props.selectedFonts} onRemove={this.handleFontRemove} styles={{ position: 'relative', height: height, justifyContent: 'flex-start' }} />
          </animated.section>
        }
      </Spring>
    )
  }

  renderButtons() {
    let sendTrans = 'translate3d(0,0,0)';

    if (this.props.isSelectOpen) {
      sendTrans = 'translate3d(0,32px,0)';
    }

    return (
      <div className="row-2">
        <Spring
          native
          config={config.stiff}
          from={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
          to={
            {
              transform: sendTrans,
              opacity: this.props.selectedFonts.length > 0 ? 1 : 0,
              marginTop: '56px'
            }
          }
        >
          {styles =>
            <Button styles={{ ...styles, pointerEvents: this.props.selectedFonts.length > 0 ? 'auto' : 'none', }} modStyles="primary wide" label="Send" onClick={this.handleSendFonts} />
          }
        </Spring>
        <Spring
          native
          config={config.stiff}
          from={{ opacity: 0, transform: 'translate3d(0,50%,0)', heigth: 0 }}
          to={
            {
              transform: this.props.useStandardFont ? 'translate3d(0,0%,0)' : 'translate3d(0,50%,0)',
              opacity: this.props.useStandardFont ? 1 : 0,

              height: this.props.useStandardFont ? 'auto' : 0
            }
          }
        >
          {styles =>
            <Button styles={{ ...styles, pointerEvents: this.props.useStandardFont ? 'auto' : 'none', }}
              modStyles="primary arrow"
              label="Next"
              onClick={this.handleNext} />
          }
        </Spring>
      </div>
    )
  }

  handleFontRemove = (index) => {
    if (this.props.selectedFonts.length === 1) {
      this.props.uiActions.resetSelectPosition();
    }

    // this.props.fontsActions.removeFontByIndex(index);
  }

  handleSendFonts = () => {
    // TODO: Upload fonts to Cloudinary
  }

  handleUseStandardFont = () => {
    this.props.fontsActions.useStandardFont(!this.props.useStandardFont);
  }

  handleFontChange = font => {
    // TODO: Update fonts on store
    // TODO: Check if the maximum number of fonts is selected
    // const newFont = this.props.fonts.find(el => el.family === font.value);

    // if (this.props.selectedFonts.length < this.props.maxFonts) {
    //   if (!this.props.selectedFonts.includes(newFont)) {
    //     this.props.fontsActions.addFont(newFont);
    //   } else {
    //     const index = this.props.selectedFonts.findIndex(font => font.family === newFont.family);
    //     this.props.fontsActions.removeFontByIndex(index);
    //   }
    // } else {
    //   if (this.props.selectedFonts.includes(newFont)) {
    //     const index = this.props.selectedFonts.findIndex(font => font.family === newFont.family);
    //     this.props.fontsActions.removeFontByIndex(index);
    //   }
    // }
  }

  handleSelectFocus = () => {
    this.props.uiActions.setSelectOpen();

    if (!this.props.translateSelect) {
      this.props.uiActions.translateSelect();
    }
  }

  handleMenuOpen = () => {
    this.props.uiActions.setSelectOpen();
  }

  handleMenuClose = () => {
    this.props.uiActions.setSelectClosed();
  }

  handleSelectBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.uiActions.setSelectClosed();

    if (this.props.selectedFonts.length === 0) {
      this.props.uiActions.resetSelectPosition();
    }
  }

  mapFontsToOptions(fontSet) {
    return fontSet.map((font) => {
      return {
        value: font.family,
        label: font.family
      }
    });
  }

  loadOptions = async (search, prevOptions) => new Promise((resolve) => {
    let filteredOptions;
    if (!search) {
      filteredOptions = this.props.fonts;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = this.props.fonts.filter(({
        family,
      }) => family.toLowerCase().includes(searchLower));
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 10);
    const mappedOptions = this.mapFontsToOptions(slicedOptions);

    setTimeout(() => {
      resolve({
        options: mappedOptions,
        hasMore,
      });
    }, 300);
  });
}

const mapStateToProps = state => {
  return {
    fonts: state.Fonts.fonts,
    fontSet: state.Fonts.fontSet,
    selectedFonts: state.Fonts.selectedFonts,
    translateSelect: state.UI.translateSelect,
    useStandardFont: state.Fonts.useStandardFont,
    isSelectOpen: state.UI.isSelectOpen,
    maxFonts: state.Fonts.maxFonts
  };
}

const mapDispatchToProps = dispatch => {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontPicker);
