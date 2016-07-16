import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import Header from '../components/Header/Header';

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
        {this.props.children}
      </div>
    );
  }
}
