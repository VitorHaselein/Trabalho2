import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';
import { NavLink, Router, Redirect } from 'react-router-dom';
import { Login } from './login';
import * as queryString from 'querystring';

export class CompraFinalizada extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                <h3 style={{ color: "gray" }}>Compra finalizada!</h3>
                <h5>Seu pedido está sendo preparado e em instantes enviaremos os dados de entrega para seu e-mail.</h5>
            </div>
        );
    }
}
