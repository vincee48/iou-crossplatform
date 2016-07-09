import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as UsersActions from '../../core/actions/users';
import UserList from '../components/UserList';

@connect(state => ({ users: state.users }))
export default class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.object,
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(UsersActions.fetchUsersIfNeeded()),
    ]);
  }

  componentDidMount() {
    Home.readyOnActions(this.props.dispatch);
  }

  renderUsers() {
    const users = this.props.users;

    if (users.readyState === UsersActions.USERS_INVALID ||
      users.readyState === UsersActions.USERS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (users.readyState === UsersActions.USERS_FETCH_FAILED) {
      return <p>Failed to fetch users</p>;
    }

    return <UserList users={users.list} />;
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <h5>Users:</h5>
        {this.renderUsers()}
        <a href="/auth/facebook">Login with Facebook</a>
        <a href="/logout">Logout</a>
        <div>
          <a href="/test">Test</a>
        </div>
      </div>
    );
  }
}
