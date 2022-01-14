import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {lvl1} from './levels';

import Game from './components/Game';

const App = () => {
    ReactDOM.render(<Game level={lvl1}/>, document.getElementById('root'));
}

App()
