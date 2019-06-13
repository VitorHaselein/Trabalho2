import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Login } from './login';
import * as bs from 'bootstrap';
import { Home } from './home';
import { Produtos } from './produtos';
import { ProdutoDetalhes } from './produto_detalhes';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom'

enum PageNames {
    Login = 0,
    Home = 1,
    Carrinho = 2,
    Produtos = 3,
    Preferences = 4,
    ProdutoDetalhes = 5
}

export class Master extends React.Component<{}, { logado: boolean, pagina: PageNames, id: number }> {
    constructor(props) {
        super(props);

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.render = this.render.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.onProdutoSelected = this.onProdutoSelected.bind(this);

        this.state = { logado: false, pagina: PageNames.Home, id: 0 };
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

    render() {
        var menu = (<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow header " >
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Home} onClick={this.onMenuItemClick}><b>AMIGO PET</b></a>
            </h5>

            <nav className="my-2 my-md-0 mr-md-3">
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Home} onClick={this.onMenuItemClick}>Início</a> */}
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Produtos} onClick={this.onMenuItemClick}>Produtos</a>
                <a className="p-2 text-dark icone-carrinho" href="#" data-pagina_id={PageNames.Carrinho} onClick={this.onMenuItemClick} title="Carrinho"></a>
                {/* <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Preferences} onClick={this.onMenuItemClick}>Configurações</a> */}
            </nav>
            <a className="btn btn-outline-primary" href="#" onClick={this.onSignOutClick}>{this.state.logado ? "Sair" : "Entrar"} </a>
        </div>);

        if (false && !this.state.logado) {
            return <Login onSuccess={this.onLoginSuccess} />
        } else {
            var conteudo = null;
            switch (this.state.pagina) {
                case PageNames.Home: {
                    conteudo = (<Home />)
                    break;
                }
                case PageNames.Produtos: {
                    // conteudo = (<Produtos onProdutoSelected={this.onProdutoSelected} />);
                    break;
                }
                case PageNames.Carrinho: {
                    conteudo = (<div>Carrinho</div>);
                    break;
                }
                case PageNames.Preferences: {
                    conteudo = (<div>Preferences</div>);
                    break;
                }
                case PageNames.ProdutoDetalhes: {
                    conteudo = <ProdutoDetalhes id={this.state.id} />
                    break;
                }
                default: {
                    conteudo = (<div>??</div>);
                    break;
                }
            }

            return (<div>
                {menu}
                <div className="container">
                    <Router>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/produtos" component={Produtos} />
                            <Route path="/produto_detalhes/:id" component={(info) => (<div><ProdutoDetalhes id={info.match.params.id} /></div>) } />
                            {/* <Route path="/carrinho" component={Carrinho} /> */}
                            <Route path="/login" component={Login} />
                            <Route path="*" component={(<div>404</div>)} />
                        </Switch>
                    </Router>
                </div>
            </div>);
        }
    }
}