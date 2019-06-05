import * as React from 'react'
import * as ReactDOM from 'react-dom';

export class Login extends React.Component<{ onSuccess: (string) => void }, { login: string, senha: string }> {
    constructor(props) {
        super(props);
        this.state = { login: "", senha: "" };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSenhaChange = this.onSenhaChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onLoginChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, { login: ev.target.value }));
    }

    onSenhaChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState(Object.assign(this.state, { senha: ev.target.value }));
    }

    onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        //alert(this.state.login + " --- " + this.state.senha);
        if (this.state.senha == "1234") {
            this.props.onSuccess(this.state.login);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4" style={{ paddingTop: "140px" }}>
                        <div className="account-wall">
                            <img className="profile-img" src="../static/images/login.jpg" alt="" />
                            <div>
                                <input type="text" name="login" id="login" className="form-control" placeholder="Email" required value={this.state.login} onChange={this.onLoginChange} />
                                <input type="password" name="senha" id="senha" className="form-control" placeholder="Senha" required value={this.state.senha} onChange={this.onSenhaChange} />
                                <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ marginBottom: "15px" }} onClick={this.onClick}>Entrar</button>
                                <a href="#" style={{ "float": "left" }}>Criar Conta</a>
                                <a href="#" style={{ "float": "right" }}>Esquecia a senha</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
