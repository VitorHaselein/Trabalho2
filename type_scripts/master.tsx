import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Login } from './login';

export class Master extends React.Component<{}, { logado: boolean }> {
    constructor(props) {
        super(props);

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.render = this.render.bind(this);

        this.state = { logado: false };
    }
    
    pagina={home:1, carrinho:2};

    onLoginSuccess(login: string) {
        this.setState(Object.assign(this.state, { logado: true }));
    }

    render() {
        var menu = (<div className="header clearfix">
            <nav>
                <ul className="nav nav-pills pull-right">
                    <li role="presentation" className="active"><a href="#">Inicio</a></li>
                    <li role="presentation"><a href="#">About</a></li>
                    <li role="presentation"><a href="#">Contact</a></li>
                </ul>
            </nav>
            <h3 className="text-muted">Project name</h3>
        </div>);

        if (!this.state.logado) {
            return <Login onSuccess={this.onLoginSuccess} />
        } else {
            return (
                <div>
                    { menu }
                    <div>Conteudo do sistema</div>
                </div>
            );
        }
    }
}