import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';
import { NavLink } from 'react-router-dom';

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

export class Produtos extends React.Component<{}, { filtro: string, produtos: Produto[] }> {
    produtos: Produto[];

    constructor(props) {
        super(props);

        this.state = { produtos: [], filtro: "" };

        this.carregaProdutos = this.carregaProdutos.bind(this);
        this.onProdutoClick = this.onProdutoClick.bind(this);
        this.filterChange = this.filterChange.bind(this);

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
        // this.props.onProdutoSelected(pid);
    }

    filterChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, { filtro: ev.target.value }));
    }

    render() {
        return (
            <div>
                <div className="row" style={{ backgroundColor: "white", padding: "32px", textAlign: "center" }}>
                    <div className="col-sm-12">
                        <input type="text" value={this.state.filtro} style={{ width: "300px", borderRadius: "4px", "border": "1px solid gray", padding: "5px" }} placeholder="Buscar..." onChange={this.filterChange} />
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    {this.state.produtos.filter(p => p.nome.toLowerCase().indexOf(this.state.filtro.toLowerCase()) > -1).map(p => (
                        <div className="col-sm-3" style={{ textAlign: "center" }} data-produtoid={p.id} onClick={this.onProdutoClick} key={p.id} >
                            <NavLink to={"/produto_detalhes/" + p.id}>
                                <div>
                                    <img style={{ maxHeight: "160px" }} src={"../static/images/" + p.imagem} />
                                </div>
                                <div style={{ color: "gray" }}>{p.nome}</div>
                                <div style={{ color: "gray" }}>{"R$ " + p.valor}</div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>);
    }
}
