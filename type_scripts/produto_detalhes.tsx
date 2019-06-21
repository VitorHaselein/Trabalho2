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

export enum OperationType {
    Add = 1,
    Remove = 2
}

export class ProdutoDetalhes extends React.Component<{ produto: Produto, qtd: number, onProdutoAddRemove: (p: Produto, operation: OperationType) => void }, {}> {
    produtos: Produto[];

    constructor(props) {
        super(props);

        this.onAddProdutoClick = this.onAddProdutoClick.bind(this);
        this.onRemoveProdutoClick = this.onRemoveProdutoClick.bind(this);
    }

    onAddProdutoClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var pid = parseInt(ev.currentTarget.getAttribute("data-produtoid"));
        this.props.onProdutoAddRemove(this.props.produto, OperationType.Add);
    }

    onRemoveProdutoClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var pid = parseInt(ev.currentTarget.getAttribute("data-produtoid"));
        this.props.onProdutoAddRemove(this.props.produto, OperationType.Remove);
    }

    render() {
        if (this.props.produto != null) {
            return (
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    <div className="col-sm-3" style={{ textAlign: "center" }} >
                        <div>
                            <img key={this.props.produto.id} style={{ height: "160px", backgroundColor: "#ccc", minWidth: "100px" }} src={"../static/images/" + this.props.produto.imagem} />
                        </div>
                        <button className="btn btn-primary" data-produtoid={this.props.produto.id} onClick={this.onAddProdutoClick}>Adicionar no Carrinho</button>
                        <button className="btn btn-danger btn-sm" data-produtoid={this.props.produto.id} onClick={this.onRemoveProdutoClick} style={{ marginTop: "5px" }} disabled={(this.props.qtd <= 0)}>Remover no Carrinho</button>
                    </div>
                    <div className="col-sm-8" style={{ textAlign: "left" }} >
                        <h3 style={{ color: "black" }}>{this.props.produto.nome}</h3>
                        <h5 style={{ color: "#3e0075" }}>{"R$ " + this.props.produto.valor}</h5>
                        <h5 style={{ color: "gray" }}>{"Estoque: " + this.props.produto.qtd}</h5>
                        <h5 style={{ color: "gray" }}>{"Quantidade: " + this.props.qtd}</h5>
                    </div>
                </div >);
        } else {
            return (<div>Buscando dados do produto...</div>);
        }
    }
}
