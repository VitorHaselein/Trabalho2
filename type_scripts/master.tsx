import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Login } from './login';
import * as bs from 'bootstrap';
import { Home } from './home';
import { Produtos } from './produtos';
import { ProdutoDetalhes } from './produto_detalhes';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { Produto } from './models';
import { ItemCarrinho, Carrinho } from './carrinho';
import { CompraFinalizada } from './compra_finalizada';
// import { BrowserRouter } from 'react-router-dom'

enum PageNames {
    Login = 0,
    Home = 1,
    Carrinho = 2,
    Produtos = 3,
    Preferences = 4,
    ProdutoDetalhes = 5
}

export class Master extends React.Component<{}, { logado: boolean, carrinho: ItemCarrinho[] }> {
    constructor(props) {
        super(props);

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.render = this.render.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.onProdutoSelected = this.onProdutoSelected.bind(this);
        this.onProdutoAdd = this.onProdutoAdd.bind(this);
        this.onItemCarrihoRemove = this.onItemCarrihoRemove.bind(this);

        this.state = { logado: false, carrinho: [] };
    }

    onMenuItemClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        var p = parseInt(e.currentTarget.getAttribute("data-pagina_id"));
        this.setState(Object.assign(this.state, { pagina: p }));
    }

    onLoginSuccess(login: string) {
        this.setState(Object.assign(this.state, { logado: true, pagina: PageNames.Home }));
    }

    onSignOutClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        this.setState(Object.assign(this.state, { logado: false }));
    }

    onProdutoSelected(id: number) {
        this.setState(Object.assign(this.state, { pagina: PageNames.ProdutoDetalhes, id: id }));
    }

    onProdutoAdd(produto: Produto) {
        var itemCarrinho = this.state.carrinho.filter(ic => ic.produto.id == produto.id).pop();

        if (itemCarrinho != null) {
            itemCarrinho.qtd++;
        } else {
            itemCarrinho = new ItemCarrinho();
            itemCarrinho.produto = produto;
            itemCarrinho.qtd = 1;

            this.state.carrinho.push(itemCarrinho);
        }

        this.setState(Object.assign(this.state, {}));
    }

    onItemCarrihoRemove(itemCarrinho: ItemCarrinho) {
        var index = this.state.carrinho.findIndex(ic => ic.produto.id == itemCarrinho.produto.id);
        this.state.carrinho.splice(index, 1);
        this.setState(this.state);
    }

    render() {
        var menu = (<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow header " >
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <NavLink to="/" className="p-2 text-dark"><b>AMIGO PET</b></NavLink>
            </h5>

            <nav className="my-2 my-md-0 mr-md-3">
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Home} onClick={this.onMenuItemClick}>Início</a> */}
                <NavLink to="/produtos" className="p-2 text-dark">Produtos</NavLink>
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Produtos} onClick={this.onMenuItemClick}>Produtos</a> */}
                <NavLink to="/carrinho" className="p-2 text-dark">Carrinho</NavLink>
                {/* <a className="p-2 text-dark icone-carrinho" href="#" data-pagina_id={PageNames.Carrinho} onClick={this.onMenuItemClick} title="Carrinho"></a> */}
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Preferences} onClick={this.onMenuItemClick}>Configurações</a> */}
            </nav>
            <a className="btn btn-outline-primary" href="#" onClick={this.onSignOutClick}>{this.state.logado ? "Sair" : "Entrar"} </a>
        </div>);

        if (false && !this.state.logado) {
            return <Login onSuccess={this.onLoginSuccess} />
        } else {
            return (<div>
                <Router>
                    {menu}
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/produtos" component={Produtos} />
                            <Route path="/produto_detalhes/:id" component={(info) => (<div><ProdutoDetalhes id={info.match.params.id} onProdutoAdd={this.onProdutoAdd} /></div>)} />
                            <Route path="/carrinho" component={(info) => (<Carrinho produtos={this.state.carrinho} onProdutoRemove={this.onItemCarrihoRemove} />)} />
                            <Route path="/login" component={Login} />
                            <Route path="/compra_finalizada" component={CompraFinalizada} />
                            <Route path="*" component={(<div>404</div>)} />
                        </Switch>
                    </div>
                </Router>
            </div>);
        }
    }
}