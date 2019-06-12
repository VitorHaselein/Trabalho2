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

export class Produtos extends React.Component<{ onProdutoSelected(id: number): void }, { produtos: Produto[] }> {
    produtos: Produto[];

    constructor(props) {
        super(props);

        this.state = { produtos: [] };

        this.carregaProdutos = this.carregaProdutos.bind(this);
        this.onProdutoClick = this.onProdutoClick.bind(this);

        this.carregaProdutos();
    }

    carregaProdutos() {
        utils.postJSON("/produtos", { emEstoque: true }).done(((produtos: Produto[]) => {
            this.setState(Object.assign(this.state, { produtos: produtos }));
        }).bind(this));
    }

    onProdutoClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // debugger;
        var pid = parseInt(ev.currentTarget.getAttribute("data-produtoid"));
        var produto = this.state.produtos.filter(p => p.id == pid).pop();
        console.log(produto.nome);
        this.props.onProdutoSelected(pid);
    }

    render() {
        return (
            <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                {this.state.produtos.map(p => (
                    <div className="col-sm-3" style={{ textAlign: "center" }} data-produtoid={p.id} onClick={this.onProdutoClick} >
                        <div>
                            <img style={{ maxHeight: "160px" }} src={"../static/images/" + p.imagem} />
                        </div>
                        <div style={{ color: "gray" }}>{p.nome}</div>
                        <div style={{ color: "gray" }}>{"R$ " + p.valor}</div>
                    </div>
                ))}
            </div>);
    }
}
