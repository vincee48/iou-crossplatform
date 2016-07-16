import React, { Component } from 'react';
import Helmet from 'react-helmet';

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
