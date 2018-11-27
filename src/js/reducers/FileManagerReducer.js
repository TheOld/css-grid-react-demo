/**
* File Manager Reducer
*/

import initialState from '../reducers/initialState';
import {
  FILES_FETCHED,
  FILES_UPLOADED,
  DELETE_UPLOADED_FILE,
} from '../types/FileManager';

const FileManagerReducer = (state = initialState.FileManager, action) => {
  switch (action.type) {
    case FILES_FETCHED:
      return {
        ...state,
        files: action.payload.files
      };
    // case FILES_UPLOADED: {
    //   return [...action.payload.files, ...state.Files];
    // }
    case DELETE_UPLOADED_FILE:
      return state.Files.filter(
        file => file.public_id !== action.publicId
      );
    default:
      return state;
  }
};

export default FileManagerReducer;


