import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AUTH_FETCHED, fetchAuthIfNeeded } from '../core/actions/auth';
import App from './containers/App';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import NoMatch from './containers/NoMatch';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!auth.user) {
        replace('/login');
      }
      cb();
    }

    if (store.getState().auth.readyState !== AUTH_FETCHED) {
      store.dispatch(fetchAuthIfNeeded()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route onEnter={requireLogin}>
        <Route path="dashboard" component={Dashboard} />
      </Route>

      <Route path="login" component={Login} />
      <Route path="*" component={NoMatch} status={404} />
    </Route>
  );
};
