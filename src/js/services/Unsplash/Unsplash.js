import ky from 'ky';

export default class Unsplash {
  constructor() {
    this.config = {
      key: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
      url: 'https://api.unsplash.com/'
    }
  }

  async getPhotos() {
    const photos = await ky.get(`${this.config.url}photos/?client_id=${this.config.key}`).json();
    return photos;
  }
}
