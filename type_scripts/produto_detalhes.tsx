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

export class ProdutoDetalhes extends React.PureComponent<{ produto: Produto, onProdutoAdd: (p: Produto) => void }, {}> {
    produtos: Produto[];

    constructor(props) {
        super(props);

        this.onProdutoClick = this.onProdutoClick.bind(this);
    }

    onProdutoClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var pid = parseInt(ev.currentTarget.getAttribute("data-produtoid"));
        this.props.onProdutoAdd(this.props.produto);
    }

    componentDidUpdate(prevProps, prevState) {
        debugger;
    }

    componentDidMount() {
        // debugger;
    }

    componentWillUpdate(a, b, c) {
        debugger;
    }

    render() {
        if (this.props.produto != null) {
            return (
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    <div className="col-sm-3" style={{ textAlign: "center" }} >
                        <div>
                            <img key={this.props.produto.id} style={{ height: "160px", backgroundColor: "#ccc", minWidth: "100px" }} src={"../static/images/" + this.props.produto.imagem} />
                        </div>
                        <button className="btn btn-primary" data-produtoid={this.props.produto.id} onClick={this.onProdutoClick}>Adicionar no Carrinho</button>
                    </div>
                    <div className="col-sm-8" style={{ textAlign: "left" }} >
                        <h3 style={{ color: "black" }}>{this.props.produto.nome}</h3>
                        <h5 style={{ color: "#3e0075" }}>{"R$ " + this.props.produto.valor}</h5>
                        <h5 style={{ color: "gray" }}>{"Estoque: " + this.props.produto.qtd}</h5>
                    </div>
                </div>);
        } else {
            return (<div>Buscando dados do produto...</div>);
        }
    }
}
