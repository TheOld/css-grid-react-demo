import { VIAB } from './FormIds';
import ky from 'ky';

export default class Typeform {
  constructor() {
    this.config = {
      baseURL: 'https://api.typeform.com',
    }
  }

  async getFormById(formId) {
    const { baseURL } = this.config;

    switch (formId) {
      // Defaulting to Video in a box for now.
      case VIAB:
      default: {
        const form = await ky.get(`${baseURL}/forms/${VIAB}`).json();
        return form;
      }
    }
  }
}
