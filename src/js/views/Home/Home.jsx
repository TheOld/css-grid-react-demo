import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import Dropzone from 'react-dropzone';
import { Image, Video } from 'cloudinary-react';
import { Link } from 'react-router-dom';


// For tests
import Cloudinary from '../../services/Cloudinary/Cloudinary';
import Unsplash from '../../services/Unsplash/Unsplash';
import Trello from '../../services/Trello/Trello';
import Typeform from '../../services/Typeform/Typeform';
import { VIAB } from '../../services/Typeform/FormIds';

/* ----------  Services  ---------- */

/* ----------  Components  ---------- */
import NaturalForm from '../../components/NaturalForm/NaturalForm';
import Button from '../../components/Button/Button';

/* ----------  Actions  ---------- */
import { filesFetched } from '../../actions/FileManagerActions';
import { formFetched, setActiveField } from '../../actions/NaturalFormActions';
import { boardFetched, listFetched, cardCreated } from '../../actions/TrelloActions';
import { setUser, signOut } from '../../actions/AuthActions';


const Container = styled(animated.section)`
  background-color: ${props => props.theme.backgroundColor};;
`;

const Title = styled.h1`
  color: red;
`;

const FileList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const MAX_SIZE = 209715200;
const MIN_SIZE = 1024;

class Home extends Component {
  constructor(props) {
    super(props);

    this.cloud = new Cloudinary('rangiora');
    this.trello = new Trello();
    this.typeform = new Typeform();
    this.unsplash = new Unsplash();
    // TODO: init auth services
  }

  static propTypes = {
    authActions: PropTypes.object.isRequired,
    fileManagerActions: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired,
    naturalFormActions: PropTypes.object.isRequired,
    trelloActions: PropTypes.object.isRequired,
    trelloList: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  // This is for demo and API tests purposes
  async componentDidMount() {
    const { naturalFormActions } = this.props;

    const photos = await this.unsplash.getPhotos();
    console.log("​Home -> componentDidMount -> photos", photos)

    const files = await this.cloud.fetchFiles();
    console.log("​Home -> componentDidMount -> files", files.resources)
    this.props.fileManagerActions.filesFetched(files.resources);

    const list = await this.trello.getFirstList();
    console.log("​Home -> componentDidMount -> list", list)
    this.props.trelloActions.listFetched(list);

    // Loading Typeform data and storing for fields
    const viabForm = await this.typeform.getFormById(VIAB);
    naturalFormActions.formFetched(viabForm);
    naturalFormActions.setActiveField(viabForm.fields[0].id);

    // Probably not needed but it's here for convenience
    // const board = await this.trello.getBoard();
    // this.props.TrelloActions.boardFetched(board);
  }

  render() {
    const defaultProps = {
      onDropAccepted: this.onDropAccepted,
      maxSize: MAX_SIZE,
      minSize: MIN_SIZE,
    };

    return (
      <Fragment>
        <header className="row-1 col-2-20">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Log in</Link></li>
            <li>{this.renderLogout()}</li>
          </ul>
        </header>
        <section className="subgrid col-2-20">
          <Title className="col-1-18">Title</Title>
          <Dropzone {...defaultProps} className="col-3-6"></Dropzone>
          <div id="gallery" className="col-1-8"></div>
          <hr className="col-1-19" />
          <h2 className="col-1-18">Files on Cloudinary</h2>
          <FileList className="col-4-8">
            {this.renderFiles()}
          </FileList>
          <Button onClick={this.handleTrelloCalls} text="Small button" className="button button-small col-3-4" />
          <hr className="col-1-19" />
          <h2 className="col-1-19">Natural Form</h2>
          <NaturalForm className="col-2-6" />
          <hr className="col-1-19" />
        </section>
      </Fragment>
    );
  }

  renderLogout() {
    if (this.props.user.uid) {
      return <Button onClick={this.handleLogOut} text="Log out" className="button-small button-ghost" />;
    }

    return null;
  }

  renderFiles() {
    return this.props.files.map((file, index) => {
      if (file.format === 'png' || file.format === 'jpg') {
        return (
          <li key={`${file.public_id}-${index}`}>
            <Image
              width="150"
              height="150"
              crop="fit"
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={file.public_id}
            />
          </li>
        )
      }

      if (file.format === 'video') {
        return (
          <li key={`${file.public_id}-${index}`}>
            <Video
              width="150"
              height="150"
              crop="fit"
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={file.public_id}
            />
          </li>
        )
      }

      return (
        <li key={`${file.public_id}-${index}`}>
          <a href="#">{file.public_id}</a>
        </li>
      )
    })
  }

  handleSignUp = () => {

    // TODO: handle sign up - which should check if the user exists or not and direct to correct view
    // this.props.authActions.setUser(user);
  }

  handleLogOut = () => {
    // TODO: Sign out using auth service
    this.props.authActions.signOut();
  }

  handleTrelloCalls = async () => {
    console.log("btn clicked");

    /*--- CREATE A NEW CARD ---*/
    // const dummyCardData = {
    //   desc: "Non et dolor occaecat anim velit in do velit incididunt reprehenderit aute deserunt in. Do mollit voluptate irure exercitation laborum exercitation consequat aliqua aliqua. Pariatur eiusmod elit cupidatat occaecat aliqua ea ipsum non sint labore consequat esse dolor tempor.Sint reprehenderit quis sint exercitation. Fugiat reprehenderit anim eu esse duis esse aute aliqua fugiat aliquip occaecat sunt anim eiusmod. Elit ea mollit voluptate aute sunt minim consectetur esse. Adipisicing officia incididunt voluptate ea duis exercitation do in cupidatat.",
    //   name: `Dummy card n ${Math.floor(Math.random() * Math.floor(100))}`,
    //   pos: 'top'
    // };
    // const card = await this.trello.createCard(dummyCardData, this.props.trelloList.id);
    // this.props.TrelloActions.cardCreated(card);

    /*--- GET CARD BY ID ---*/
    // const createdCard = await this.trello.getCardById("zrhs30yy");
    // console.log('TCL: Home -> handleCreateCard -> createdCard', createdCard);

    /*--- ADD A COMMENT TO A CARD ---*/
    // const resp = this.trello.addComment("zrhs30yy", "Dummy comment");
  }

  onDropAccepted = async (fileList) => {
    try {
      await this.cloud.upload(fileList[0], this.onProgress);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onProgress = (progress) => {
    console.info('TCL: Home -> onProgress -> progress', progress);
  }
}

const mapStateToProps = (state) => ({
  files: state.FileManager.files,
  trelloList: state.Trello.list,
  user: state.Auth.User
});

const mapDispatchToProps = (dispatch) => ({
  fileManagerActions: bindActionCreators({ filesFetched }, dispatch),
  trelloActions: bindActionCreators({ boardFetched, listFetched, cardCreated }, dispatch),
  naturalFormActions: bindActionCreators({ formFetched, setActiveField }, dispatch),
  authActions: bindActionCreators({ setUser, signOut }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
