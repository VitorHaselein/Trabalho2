import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';
import { NavLink, Router, Redirect } from 'react-router-dom';
import { Login } from './login';
import * as queryString from 'querystring';
import { ItemCarrinho } from './carrinho';

export class FinalizarCompra extends React.Component<{ logado: boolean, carrinho: ItemCarrinho[] }, {}> {
    constructor(props) {
        super(props);
        const values = queryString.parse(document.location.search);
    }

    getTotal() {
        var total = 0;
        for (let index = 0; index < this.props.carrinho.length; index++) {
            const itemCarrinho = this.props.carrinho[index];
            total += itemCarrinho.qtd * itemCarrinho.produto.valor;
        }
        return total;
    }

    render() {
        if (this.props.logado) {
            return (
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    <div className="col-sm-12">
                        <h3 style={{ color: "gray" }}>Finalizar Compra</h3>
                        <h5 style={{ width: "100%" }}>Verifique os dados do pedido abaixo e clique em "Confirmar Pagamento".</h5>
                        <br />
                        <h3>Total:</h3>
                        <h1>{"R$: " + this.getTotal().toFixed(2)}</h1>
                        <br />
                        <ul>
                            {this.props.carrinho.map(ic => (<li key={ic.produto.id}>{ic.qtd + " X " + ic.produto.nome}</li>))}
                        </ul>
                        <NavLink to="/compra_finalizada" class="btn btn-primary btn-lg">Confirmar Pagamento</NavLink>
                        <NavLink to="/carrinho" style={{ marginLeft: "30px" }}>Voltar para o carrinho</NavLink>
                    </div>
                </div >
            );
        } else {
            return (<Redirect to='/login?redirectTo=/finalizar_compra' />);
        }
    }
}
