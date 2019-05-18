import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestClass from './mainPage/routes';

//@ts-ignore
window.renderApp = async function renderApp(element: any) {
  ReactDOM.render(
    <TestClass />,
    element
  );
}


