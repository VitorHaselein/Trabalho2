import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Master } from './master';

var updateUI = () => {
    var _render = () => {
        ReactDOM.render(
            <Master />,
            document.getElementById('content')
        );
    };

    _render();
};

updateUI();
