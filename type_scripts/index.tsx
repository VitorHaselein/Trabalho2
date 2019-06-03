import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Produtos, Produto } from './produtos';

var updateUI = () => {
    var produtos: Produto[] = [];
    produtos.push(new Produto(1, "Shampoo", 25));
    produtos.push(new Produto(2, "Coleira", 15));

    var _render = () => {
        ReactDOM.render(
            <Produtos dados={produtos} />,
            document.getElementById('root')
        );
    };

    _render();
};

updateUI();
