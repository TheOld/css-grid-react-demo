import ky from 'ky';

import { appendTrelloKeyToken } from '../../util/AppendToken';

export default class Trello {
  constructor() {
    this.config = {
      baseURL: 'https://api.trello.com/1',
      boardId: process.env.REACT_APP_TRELLO_BOARDID
    }
  }

  /**
   * Get's the board from Trello.
   *
   * @memberof Trello
   */
  async getBoard() {
    const { baseURL, boardId } = this.config;

    const board = await ky.get(`${baseURL}/board/${boardId}?${appendTrelloKeyToken()}`).json();

    return board;
  }

  /**
   * Get the first list object from the Trello board.
   *
   * @returns {object} List
   * @memberof Trello
   */
  async getFirstList() {
    const { baseURL, boardId } = this.config;

    const list = await ky.get(`${baseURL}/board/${boardId}/lists/?${appendTrelloKeyToken()}`).json();

    return list[0];
  }

  /**
   * Creates or updates a Trello card on the selected List
   *
   * @param {object} cardData
   * @param {string} listId
   * @memberof Trello
   */
  async createCard(cardData, listId) {
    const { baseURL } = this.config;

    let args = [];
    for (const arg in cardData) {
      if (cardData.hasOwnProperty(arg)) {
        const item = `${arg}=${cardData[arg]}&`;
        args.push(item);
      }
    }

    const url = `${baseURL}/cards?idList=${listId}&${args.join("").slice(0, -1)}&${appendTrelloKeyToken()}`;

    const resp = await ky.post(url).json();

    return resp;
  }

  /**
   * Adds a new comment to the selected card
   *
   * @param {string} cardId
   * @param {string} comment
   * @returns API call response
   * @memberof Trello
   */
  addComment(cardId, comment) {
    const { baseURL } = this.config;
    const url = `${baseURL}/cards/${cardId}/actions/comments?text=${comment}&${appendTrelloKeyToken()}`;
    const resp = ky.post(url).json();

    return resp;
  }

  /**
   * Gets the Trello card identified by the ID
   *
   * @param {string} id
   * @returns {object} Trello card object.
   * @memberof Trello.
   */
  async getCardById(id) {
    const { baseURL } = this.config;

    const resp = await ky.get(`${baseURL}/cards/${id}/?${appendTrelloKeyToken()}`).json();

    return resp;
  }
}
