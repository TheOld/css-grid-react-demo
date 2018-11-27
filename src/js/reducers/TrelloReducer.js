/**
* Trello Reducer
*/
import initialState from '../reducers/initialState';
import {
  TRELLO_BOARD_FETCHED,
  TRELLO_LIST_FETCHED,
  TRELLO_CARD_CREATED,
  // CARD_UPDATED
} from '../types/TrelloTypes';

const TrelloReducer = (state = initialState.Trello, action) => {
  switch (action.type) {
    case TRELLO_BOARD_FETCHED:
      return {
        ...state,
        board: action.payload.board
      };
    case TRELLO_LIST_FETCHED:
      return {
        ...state,
        list: action.payload.list
      };
    // case CARD_UPDATED:
    case TRELLO_CARD_CREATED:
      return {
        ...state,
        card: action.payload.card
      };
    default:
      return state;
  }
};

export default TrelloReducer;


