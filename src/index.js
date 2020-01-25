import React from 'react';
import ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import './css/index.css';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

initializeIcons();

ReactDOM.render(
  <Fabric>
    <App />
  </Fabric>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
