import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './App.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s | iou"
          meta={[
            { 'char-set': 'utf-8' },
            {
              name: 'description',
              content: 'I owe you',
            },
          ]}
        />
        <Header />
        <div className={styles.root}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
