import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';

export default class Dashboard extends Component {
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
