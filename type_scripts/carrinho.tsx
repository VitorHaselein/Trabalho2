import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';
import { NavLink } from 'react-router-dom';

export class ItemCarrinho {
    produto: Produto;
    qtd: number;
}

export class Carrinho extends React.Component<{ produtos: ItemCarrinho[], onProdutoRemove: (ic: ItemCarrinho) => void }, { total: number }> {
    constructor(props) {
        super(props);

        this.calculateTotal = this.calculateTotal.bind(this);
    }

    onProdutoRemove(ic: ItemCarrinho) {
        this.props.onProdutoRemove(ic);
    }

    calculateTotal() {
        var total = 0;

        for (var i = 0; i < this.props.produtos.length; i++) {
            var itemCarrinho = this.props.produtos[i];
            total += itemCarrinho.produto.valor * itemCarrinho.qtd;
        }

        return total;
    }

    render() {
        return (
            <div>
                {(this.props.produtos.length <= 0 ?
                    (<div className="row" style={{ backgroundColor: "white", padding: "32px" }}><h3>{"Carrinho vazio :-("}</h3></div>) :
                    (<div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                        {this.props.produtos.map(p => (
                            <div key={p.produto.id} className="col-sm-12" style={{ textAlign: "left", padding: "5px", borderBottom: "1px solid #ccc" }} data-produtoid={p.produto.id} >
                                <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "top", width: "150px" }}>
                                    <NavLink to={"/produto_detalhes/" + p.produto.id}>
                                        <img style={{ maxHeight: "100px" }} src={"../static/images/" + p.produto.imagem} />
                                    </NavLink>
                                    <input type="button" className="btn btn-danger btn-sm" value="Remover" onClick={() => this.onProdutoRemove(p)}></input>
                                </div>
                                <div style={{ display: "inline-block", verticalAlign: "top" }}>
                                    <div style={{ color: "gray" }}>{p.produto.nome}</div>
                                    <div style={{ color: "gray" }}>{"Qtd " + p.qtd}</div>
                                    <div style={{ color: "gray" }}>{"Unitário R$ " + p.produto.valor}</div>
                                    <div style={{ color: "gray" }}>{"Total R$ " + (p.qtd * p.produto.valor).toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                        <div className="col-sm-12" style={{ textAlign: "right", padding: "5px" }} >
                            <h1>R$ {this.calculateTotal().toFixed(2)}</h1>
                            <NavLink to="/finalizar_compra" className="btn btn-primary btn-lg">Finalizar Compra</NavLink>
                        </div>
                    </div>
                    ))}
            </div>);
    }
}
