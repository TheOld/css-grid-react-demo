import AjaxInterceptor from 'ajax-interceptor';
import NProgress from 'nprogress';

class AjaxInterceptorService {
  register() {
    // Will proxify XHR to fire the callbacks
    AjaxInterceptor.wire();
  }
}

// Setup some callbacks
AjaxInterceptor.addRequestCallback((xhr) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(xhr);
  }

  NProgress.inc();
});

AjaxInterceptor.addResponseCallback((xhr) => {

  if (process.env.NODE_ENV === 'development') {
    console.info(xhr);
  }

  if (window.isLoading) {
    const hideLoading = new Event('hideloading');
    document.dispatchEvent(hideLoading);
  }

  NProgress.done();
});

export default new AjaxInterceptorService();
