import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
// import rootReducer from '../reducers/rootReducer';
import createRootReducer from '../reducers/rootReducer';
import logger from 'redux-logger';
import initialState from '../reducers/initialState';

export const history = createHistory()

const enhancers = [];
const middlewares = [
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  middlewares.push(logger)
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
)

export default store
