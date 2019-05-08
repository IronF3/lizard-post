
import React from 'react';
global.React = React;

import config from '_srcConfig';
import routes from '_srcMainPage/routes';

console.log(_srcConfig);

if (process.env.NODE_ENV ==='development') {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', '/webpack-dev-server.js');
  document.body.appendChild(script);
}
