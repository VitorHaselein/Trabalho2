import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Login } from './login';
import * as bs from 'bootstrap';

enum PageNames {
    Login = 0,
    Home = 1,
    Carrinho = 2,
    Produtos = 3,
    Preferences = 4
}

export class Master extends React.Component<{}, { logado: boolean, pagina: PageNames }> {
    constructor(props) {
        super(props);

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.render = this.render.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);

        this.state = { logado: false, pagina: PageNames.Login };
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

    render() {
        var menu = (<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Home} onClick={this.onMenuItemClick}><b>Pet</b> Shop</a>
            </h5>

            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Home} onClick={this.onMenuItemClick}>Início</a>
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Produtos} onClick={this.onMenuItemClick}>Produtos</a>
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Carrinho} onClick={this.onMenuItemClick}>Carrinho</a>
                <a className="p-2 text-dark" href="#" data-pagina_id={PageNames.Preferences} onClick={this.onMenuItemClick}>Configurações</a>
            </nav>
            <a className="btn btn-outline-primary" href="#" onClick={this.onSignOutClick}>Sair</a>
        </div>);

        if (!this.state.logado) {
            return <Login onSuccess={this.onLoginSuccess} />
        } else {
            var conteudo = null;
            switch (this.state.pagina) {
                case PageNames.Home: {
                    conteudo = (<div>Home</div>);
                    break;
                }
                case PageNames.Produtos: {
                    conteudo = (<div>Produto</div>);
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
                default: {
                    conteudo = (<div>??</div>);
                }
            }

            return (<div>
                {menu}
                {conteudo}
            </div>);
        }
    }
}