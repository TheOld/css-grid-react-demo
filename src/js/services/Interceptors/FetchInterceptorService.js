import fetchIntercept from 'fetch-intercept';
import NProgress from 'nprogress';

class FetchInterceptorService {
  register = () => {
    fetchIntercept.register({
      request(url, config) {
        // Modify the url or config here
        NProgress.inc();
        return [url, config];
      },

      requestError(error) {
        // Called when an error occurred during another 'request' interceptor call
        NProgress.done();

        // TODO: Add messenger component to inform used of errors
        // Show feedback message
        // const data = { detail: { type: 'error', title: error.message, copy: error.message } };
        // const showMessage = new CustomEvent('showmessage', data);
        // document.dispatchEvent(showMessage);

        return Promise.reject(error);
      },

      response(response) {
        // Modify the response object
        NProgress.done();

        return response;
      },

      responseError(error) {
        // Handle an fetch error
        NProgress.done();

        // TODO: Add messenger component to inform used of errors
        // Show feedback message
        // const data = { detail: { type: 'error', title: error.message, copy: error.message } };
        // const showMessage = new CustomEvent('showmessage', data);
        // document.dispatchEvent(showMessage);

        // if (window.isLoading) {
        //   const hideLoading = new Event('hideloading');
        //   document.dispatchEvent(hideLoading);
        // }

        return Promise.reject(error);
      },
    });
  };
}
export default new FetchInterceptorService();
