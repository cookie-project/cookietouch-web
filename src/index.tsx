import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/pro-solid-svg-icons';
import { faBullhorn } from '@fortawesome/pro-light-svg-icons';
import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import App from './App';
import './index.scss';
import './i18n';

library.add(fab, faCheckSquare, faCoffee, faBullhorn);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
