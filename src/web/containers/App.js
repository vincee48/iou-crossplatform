import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const App = (props) => (
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
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
