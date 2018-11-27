import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import ky from 'ky';
import superagentPromisePlugin from 'superagent-promise-plugin';
import superagent from 'superagent';

const request = superagentPromisePlugin.patch(superagent);

/**
 * Custom class to handle Cloudinary related API calls
 *
 * @export
 * @class Cloudinary
 */
export default class Cloudinary {
  constructor(clientName) {
    this.config = {
      name: process.env.REACT_APP_CLOUDINARY_NAME,
      key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
      // This is the autheticated URL
      // url: process.env.REACT_APP_CLOUDINARY_URL,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      // openHost is for queries that do not require auth
      openHost: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}`,
      coreCloudinary: CoreCloudinary.new()
    };

    this.options = {
      apiKey: this.config.key,
      apiSecret: this.config.secret,
      cloudName: this.config.name,
      folder: this.clientName,
      format: 'json',
      type: 'list',
      // version: Math.ceil(new Date().getTime() / 1000),
    };

    this.clientName = clientName;
  }


  /**
   * Set's the API endpoint URL
   *
   * @returns {string} URL
   * @memberof Cloudinary
   */
  setURL() {
    const scOptions = Util.withSnakeCaseKeys(this.options);
    return this.config.coreCloudinary.url(this.clientName, scOptions);
  }

  /**
   * Fetches the files in the client's folder from Cloudinary
   *
   * @returns {array} Array with files in folder.
   * @memberof Cloudinary
   */
  async fetchFiles() {
    const urlPath = this.setURL();

    return await ky.get(urlPath).json();

    // fetch(urlPath)
    //   .then(res => res.text())
    //   .then(text => (text ? JSON.parse(text).resources : []));
  }

  /**
   * Uploads the file to the current client's folder on Cloudinary
   *
   * @param {*} file - The file to upload to Cloudinary.
   * @param {*} onProgress - Callback function to update UI with progress value.
   * @memberof Cloudinary
   */
  async upload(file, onProgress) {
    const { openHost, uploadPreset } = this.config;

    const fd = new FormData();

    fd.append('upload_preset', uploadPreset);
    fd.append('tags', `${this.clientName}, viab_upload`);
    fd.append('folder', this.clientName);
    fd.append('file', file);

    await request
      .post(`${openHost}/upload`)
      .set('X-Requested-With', 'XMLHttpRequest')
      // .set('Authorization', 'Basic ' + Base64.encode(`${key}:${secret}`))
      .send(fd)
      .on('progress', (e) => {
        onProgress(e.percent);
      });

    onProgress(100);
  }

}
