import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* ----------  Reducers  ---------- */
import FileManager from './FileManagerReducer';
import Trello from './TrelloReducer';
import NaturalForm from './NaturalFormReducer';
import UI from './ThemeReducer';
import Auth from './AuthReducer';



export default (history) => combineReducers({
  router: connectRouter(history),
  FileManager,
  Trello,
  NaturalForm,
  UI,
  Auth,
});
