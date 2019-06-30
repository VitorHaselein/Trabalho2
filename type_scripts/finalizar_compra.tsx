import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto, User } from './models';
import { NavLink, Router, Redirect } from 'react-router-dom';
import { Login } from './login';
import * as queryString from 'querystring';
import { ItemCarrinho } from './carrinho';

export class FinalizarCompra extends React.Component<{ usuario_logado: User, carrinho: ItemCarrinho[] }, { goto: string }> {
    constructor(props) {
        super(props);

        this.state = { goto: "" };

        const values = queryString.parse(document.location.search);

        this.confirmarPagamento = this.confirmarPagamento.bind(this);
    }

    getTotal() {
        var total = 0;
        for (let index = 0; index < this.props.carrinho.length; index++) {
            const itemCarrinho = this.props.carrinho[index];
            total += itemCarrinho.qtd * itemCarrinho.produto.valor;
        }
        return total;
    }

    confirmarPagamento() {
        var dados = {
            cliente_id: 1,
            carrinho: this.props.carrinho.map(c => ({
                produto_id: c.produto.id,
                qtd: c.qtd,
            }))
        };

        utils.postJSON("/vendas/finalizar", dados).done(function () {
            // Compra finalizada.
            this.setState(Object.assign(this.state, { goto: "/compra_finalizada" }));
        }.bind(this));
    }

    render() {
        if (this.state.goto) {
            return (<Redirect to={this.state.goto} />);
        }
        else if (this.props.usuario_logado) {
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
                        {/* <NavLink to="/compra_finalizada" class="btn btn-primary btn-lg">Confirmar Pagamento</NavLink> */}
                        <button className="btn btn-primary btn-lg" onClick={this.confirmarPagamento}>Confirmar Pagamento</button>
                        <NavLink to="/carrinho" style={{ marginLeft: "30px" }}>Voltar para o carrinho</NavLink>
                    </div>
                </div >
            );
        } else {
            return (<Redirect to='/login?redirectTo=/finalizar_compra' />);
        }
    }
}
