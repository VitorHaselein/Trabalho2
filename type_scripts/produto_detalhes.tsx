import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';

// export class Produto {
//     id: number;
//     name: string;
//     preco: Number;

//     /**
//      *
//      */
//     constructor(id: number, name: string, preco: Number) {
//         this.id = id;
//         this.name = name;
//         this.preco = preco;
//     }
// }

export class ProdutoDetalhes extends React.Component<{ id: Number, onProdutoAdd: (p: Produto) => void }, { produto: Produto }> {
    produtos: Produto[];

    constructor(props) {
        super(props);
        this.state = { produto: null };

        this.carregaProdutos = this.carregaProdutos.bind(this);
        this.onProdutoClick = this.onProdutoClick.bind(this);

        this.carregaProdutos();
    }

    carregaProdutos() {
        jQuery.get("/produtos/getById/" + this.props.id).done(((produto: Produto) => {
            this.setState(Object.assign(this.state, { produto: produto }));
        }).bind(this));
    }

    onProdutoClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var pid = parseInt(ev.currentTarget.getAttribute("data-produtoid"));
        this.props.onProdutoAdd(this.state.produto);
    }

    render() {
        if (this.state.produto != null) {
            return (
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    <div className="col-sm-3" style={{ textAlign: "center" }} >
                        <div>
                            <img style={{ height: "160px", backgroundColor: "#ccc", minWidth: "100px" }} src={"../static/images/" + this.state.produto.imagem} />
                        </div>
                        <button className="btn btn-primary" data-produtoid={this.state.produto.id} onClick={this.onProdutoClick}>Adicionar no Carrinho</button>
                    </div>
                    <div className="col-sm-8" style={{ textAlign: "left" }} >
                        <h3 style={{ color: "black" }}>{this.state.produto.nome}</h3>
                        <h5 style={{ color: "#3e0075" }}>{"R$ " + this.state.produto.valor}</h5>
                        <h5 style={{ color: "gray" }}>{"Estoque: " + this.state.produto.qtd}</h5>
                    </div>
                </div>);
        } else {
            return (<div>Buscando dados do produto...</div>);
        }
    }
}
