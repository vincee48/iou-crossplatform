import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Helmet title="Login" />
        <a href="/auth/facebook">Login with Facebook</a>
      </div>
    );
  }
}
