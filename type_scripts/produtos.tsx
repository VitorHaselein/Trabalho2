import * as React from 'react'
import * as ReactDOM from 'react-dom';

export class Produto {
    id: number;
    name: string;
    preco: Number;

    /**
     *
     */
    constructor(id: number, name: string, preco: Number) {
        this.id = id;
        this.name = name;
        this.preco = preco;
    }
}

export class Produtos extends React.Component<{ dados: Produto[] }, {}> {
    produtos: Produto[];

    constructor(props) {
        super(props);
    }

    onProdutoClick(ev: React.MouseEvent<HTMLLIElement>) {
        var obj = (this as object) as Produto;
        alert(obj.name);
    }

    render() {
        return (<ul className='produtos'>{this.props.dados.map(p => (
            <li key={p.id} className='produto' style={{ color: "blue" }} onClick={this.onProdutoClick.bind(p)}>
                {p.name}
            </li>))
        }</ul>);
    }
}
