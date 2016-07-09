import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import * as AuthActions from '../../core/actions/auth';
import { connect } from 'react-redux';

export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.element,
  };

  render() {
    return(
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
        {this.props.children}
      </div>
    );
  }
}
