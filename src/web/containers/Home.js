import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as UsersActions from '../../core/actions/users';
import { Link } from 'react-router';
import Logo from '../components/Logo/Logo';

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

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Logo />
        <a href="/auth/facebook">Login with Facebook</a>
        <a href="/logout">Logout</a>
        <div>
          <Link to="dashboard">Dashboard</Link>
        </div>
      </div>
    );
  }
}
