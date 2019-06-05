import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Produtos, Produto } from './produtos';
import { Login } from './login';
import { Master } from './master';

var updateUI = () => {
    var produtos: Produto[] = [];
    produtos.push(new Produto(1, "Shampoo", 25));
    produtos.push(new Produto(2, "Coleira", 15));
    //<Produtos dados={produtos} />,

    var _render = () => {
        ReactDOM.render(
            <Master />,
            document.getElementById('content')
        );
    };

    _render();
};

updateUI();
