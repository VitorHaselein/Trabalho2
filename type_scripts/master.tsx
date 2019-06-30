import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Login } from './login';
import * as bs from 'bootstrap';
import { Home } from './home';
import { Produtos } from './produtos';
import { ProdutoDetalhes, OperationType } from './produto_detalhes';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { Produto, User } from './models';
import { ItemCarrinho, Carrinho } from './carrinho';
import { FinalizarCompra } from './finalizar_compra';
import { DataSource } from './dataSource';
import { useEffect, useRef } from 'react';
import { CompraFinalizada } from './compra_finalizada';
import { UserProfile } from './user_profile';
// import { BrowserRouter } from 'react-router-dom'

enum PageNames {
    Login = 0,
    Home = 1,
    Carrinho = 2,
    Produtos = 3,
    Preferences = 4,
    ProdutoDetalhes = 5
}

export class Master extends React.Component<{}, { usuario_logado: User, carrinho: ItemCarrinho[] }> {
    ds: DataSource = new DataSource();

    constructor(props) {
        super(props);

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.render = this.render.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.onProdutoSelected = this.onProdutoSelected.bind(this);
        this.onProdutoAddRemove = this.onProdutoAddRemove.bind(this);
        this.onItemCarrinhoRemove = this.onItemCarrinhoRemove.bind(this);
        this.renderProdutoDetalhes = this.renderProdutoDetalhes.bind(this);
        this.renderCarrinho = this.renderCarrinho.bind(this);
        this.renderFinalizarCompra = this.renderFinalizarCompra.bind(this);
        this.renderLogin = this.renderLogin.bind(this);

        this.getCarrinhoCount = this.getCarrinhoCount.bind(this);

        this.state = { usuario_logado: null, carrinho: [] };

        this.ds.getProdutos();
    }

    onMenuItemClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        var p = parseInt(e.currentTarget.getAttribute("data-pagina_id"));
        this.setState(Object.assign(this.state, { pagina: p }));
    }

    onLoginSuccess(usuario: User) {
        this.setState(Object.assign(this.state, { usuario_logado: usuario, pagina: PageNames.Home }));
    }

    onSignOutClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        if (this.state.usuario_logado) {
            this.setState(Object.assign(this.state, { logado: false }));
        } else {
            return
        }
    }

    onProdutoSelected(id: number) {
        this.setState(Object.assign(this.state, { pagina: PageNames.ProdutoDetalhes, id: id }));
    }

    onProdutoAddRemove(produto: Produto, operation: OperationType) {
        var carrinho = this.state.carrinho.slice(0);
        var itemCarrinho = carrinho.filter(ic => ic.produto.id == produto.id).pop();

        if (itemCarrinho != null) {
            var idx = carrinho.indexOf(itemCarrinho);
            carrinho[idx] = Object.assign(itemCarrinho, { qtd: itemCarrinho.qtd + (operation == OperationType.Add ? 1 : -1) });
            if (carrinho[idx].qtd <= 0) {
                carrinho.splice(idx, 1);
            }
        } else {
            if (operation == OperationType.Add) {
                itemCarrinho = new ItemCarrinho();
                itemCarrinho.produto = produto;
                itemCarrinho.qtd = 1;
                carrinho.push(itemCarrinho);
            }
        }

        this.setState(Object.assign(this.state, { carrinho: carrinho }));
    }

    useTraceUpdate(props) {
        const prev = useRef(props);
        useEffect(() => {
            const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
                if (prev.current[k] !== v) {
                    ps[k] = [prev.current[k], v];
                }
                return ps;
            }, {});
            if (Object.keys(changedProps).length > 0) {
                console.log('Changed props:', changedProps);
            }
            prev.current = props;
        });
    }

    onItemCarrinhoRemove(itemCarrinho: ItemCarrinho) {
        var index = this.state.carrinho.findIndex(ic => ic.produto.id == itemCarrinho.produto.id);
        var carrinho = this.state.carrinho.slice(0);
        carrinho.splice(index, 1);
        this.setState(Object.assign(this.state, { carrinho: carrinho }));
    }

    getProduto(id: Number): Produto {
        return this.ds.getProdutoById(id);
    }

    getProdutoQtd(id: Number): number {
        var itemCarrinho = this.state.carrinho.filter(it => it.produto.id == id);

        if (itemCarrinho.length > 0) {
            return itemCarrinho[0].qtd;
        }

        return 0;
    }

    getCarrinhoCount() {
        var total = 0;
        for (let index = 0; index < this.state.carrinho.length; index++) {
            const item = this.state.carrinho[index];
            total += item.qtd;
        }
        return total;
    }

    renderProdutoDetalhes(info) {
        // component={(info) => ()
        return (<div key={info.match.params.id}>
            <ProdutoDetalhes produto={this.getProduto(info.match.params.id)} qtd={this.getProdutoQtd(info.match.params.id)} onProdutoAddRemove={this.onProdutoAddRemove} />
        </div>);
    }

    renderCarrinho(info) {
        return (<Carrinho produtos={this.state.carrinho} onProdutoRemove={this.onItemCarrinhoRemove} />);
    }

    renderFinalizarCompra(info) {
        return (<FinalizarCompra usuario_logado={this.state.usuario_logado} carrinho={this.state.carrinho} />);
    }

    renderLogin(info) {
        return (<Login onSuccess={this.onLoginSuccess} />);
    }

    renderUserProfile(info) {
        return (<UserProfile id={parseInt(info.match.params.id)} />);
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
                <NavLink to="/carrinho" className="p-2 text-dark">🛒</NavLink>
                {/* <a className="p-2 text-dark icone-carrinho" href="#" data-pagina_id={PageNames.Carrinho} onClick={this.onMenuItemClick} title="Carrinho"></a> */}
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Preferences} onClick={this.onMenuItemClick}>Configurações</a> */}
            </nav>
            {(!this.state.usuario_logado ? <NavLink to={"/login"} className="btn btn-outline-primary">Entrar</NavLink> : <a href="#" className="btn btn-outline-primary" onClick={this.onSignOutClick}>Sair</a>)}
        </div>);


        if (false && !this.state.usuario_logado) {
            return <Login onSuccess={this.onLoginSuccess} />
        } else {
            return (<div>
                <Router>
                    {menu}
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/produtos" component={Produtos} />
                            <Route path="/produto_detalhes/:id" component={this.renderProdutoDetalhes} />
                            <Route path="/carrinho" component={this.renderCarrinho} />
                            <Route path="/finalizar_compra" component={this.renderFinalizarCompra} />
                            <Route path="/compra_finalizada" component={CompraFinalizada} />
                            <Route path="/login" component={this.renderLogin} />
                            <Route path="/user/:id" component={this.renderUserProfile} />
                            <Route path="/new-user" component={this.renderUserProfile} />
                            <Route path="*" component={(<div>404</div>)} />
                        </Switch>
                    </div>
                </Router>
            </div>);
        }
    }
}