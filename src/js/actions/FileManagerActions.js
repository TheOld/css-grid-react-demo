/**
* File Manager Actions
*/

import {
  FILES_FETCHED,
  FILES_UPLOADED,
  DELETE_UPLOADED_FILE,
  UPDATE_UPLOADED_FILE,
} from '../types/FileManager';

/* ----------  Actions  ---------- */
export const filesFetched = files => ({
  type: FILES_FETCHED,
  payload: {
    files,
  }
});

export const filesUploaded = files => ({
  type: FILES_UPLOADED,
  payload: {
    files,
  }
});

export const updateUploadedFile = uploadedFile => ({
  type: UPDATE_UPLOADED_FILE,
  payload: {
    uploadedFile,
  }
});

export const deleteFile = publicId => ({
  type: DELETE_UPLOADED_FILE,
  payload: {
    publicId,
  }
});
