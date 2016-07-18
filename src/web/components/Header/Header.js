import React, { Component, PropTypes } from 'react';
import styles from './Header.css';
import { connect } from 'react-redux';

@connect(state => ({ auth: state.auth }))
export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object,
  };

  render() {
    return (
      <div className={styles.root}>
        Header
      </div>
    );
  }
}
