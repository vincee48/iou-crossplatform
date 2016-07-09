import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import * as AuthActions from '../../core/actions/auth';
import { connect } from 'react-redux';

@connect(state => ({ auth: state.auth }))
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.element,
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(AuthActions.fetchAuthIfNeeded()),
    ]);
  }

  componentDidMount() {
    App.readyOnActions(this.props.dispatch);
  }

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
        <div>{Object.keys(this.props.auth.user).length}</div>
      </div>
    );
  }
}
