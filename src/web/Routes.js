import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AUTH_FETCHED } from '../core/actions/auth';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import NoMatch from './containers/NoMatch';
import * as AuthActions from '../core/actions/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      console.log(auth);
      if (!auth.user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (store.getState().auth.readyState !== AUTH_FETCHED) {
      console.log('fetching if needed');
      store.dispatch(AuthActions.fetchAuthIfNeeded()).then(checkAuth);
    } else {
      console.log('checking auth');
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route onEnter={requireLogin}>
        <Route path="test" component={Home}/>
      </Route>

      <Route path="login" component={Login} />
      <Route path="*" component={NoMatch} status={404} />
    </Route>
  );
}
