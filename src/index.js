/* ----------  Libs  ---------- */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NProgress from 'nprogress';

/* ----------  Store  ---------- */
import store, { history } from './js/store';

/* ----------  Services  ---------- */
import FetchInterceptorService from './js/services/Interceptors/FetchInterceptorService';
import AjaxInterceptorService from './js/services/Interceptors/AjaxInterceptorService';
import * as serviceWorker from './serviceWorker';

/* ----------  Styles  ---------- */
import './css/style.scss';

/* ----------  Container  ---------- */
import App from './js/containers/App';

/* ----------  Initializers  ---------- */
NProgress.configure({ easing: 'cubic-bezier(0.4, 0, 0.2, 1)', speed: 200 });
FetchInterceptorService.register();
AjaxInterceptorService.register();

const target = document.getElementById('root');

const renderApp = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    target
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./js/containers/App', renderApp)
  }
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
