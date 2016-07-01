import React, { Component, PropTypes } from 'react';

class Root extends Component {
  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }
    return null;
  }

  renderEnvironment() {
    /* eslint-disable */
    const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
    /* eslint-enable */
    return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
  }

  render() {
    const {
      head,
      content,
    } = this.props;

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {this.renderEnvironment()}
          {this.renderInitialState()}
          {head.script.toComponent()}
          <script src={!process.env.NODE_ENV ? '/bundle.js' : '/bundle.min.js'}></script>
        </body>
      </html>
    );
  }
}

Root.propTypes = {
  content: PropTypes.string,
  initialState: PropTypes.object,
  head: PropTypes.object,
};

export default Root;