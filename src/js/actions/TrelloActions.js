/**
* Trello Actions
*/

import {
  TRELLO_BOARD_FETCHED,
  TRELLO_LIST_FETCHED,
  TRELLO_CARD_CREATED,
  TRELLO_CARD_UPDATED
} from '../types/TrelloTypes';

export const boardFetched = board => ({
  type: TRELLO_BOARD_FETCHED,
  payload: {
    board
  }
});

export const listFetched = list => ({
  type: TRELLO_LIST_FETCHED,
  payload: {
    list
  }
});

export const cardCreated = card => ({
  type: TRELLO_CARD_CREATED,
  payload: {
    card
  }
});

export const cardUpdated = card => ({
  type: TRELLO_CARD_UPDATED,
  payload: {
    card
  }
});
