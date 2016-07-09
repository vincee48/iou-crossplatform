import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Helmet from 'react-helmet';

export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Helmet title="Dashboard" />
        <IndexLink to="/">Home</IndexLink>
        <div>
          Dashboard
        </div>
      </div>
    );
  }
}
