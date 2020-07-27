import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {empty32x32} from './levels';

import Game from './components/Game';

const App = () => {
    ReactDOM.render(<Game lvl={empty32x32}/>, document.getElementById('root'));
}

App()
