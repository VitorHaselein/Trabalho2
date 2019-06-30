import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { User } from './models';
import { NavLink, Router } from 'react-router-dom';

export class UserProfile extends React.Component<{ id: number }, { usuario: User }> {
    constructor(props) {
        super(props);

        this.state = { usuario: new User() };
        this.carregaDados = this.carregaDados.bind(this);

        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onCepChange = this.onCepChange.bind(this);
        this.onEnderecoChange = this.onEnderecoChange.bind(this);

        this.onSave = this.onSave.bind(this);

        if (this.props.id >= 1)
            this.carregaDados(this.props.id);
    }

    carregaDados(id: number) {
        utils.postJSON("/usuarios/getById/" + id, {}).done(((user: User[]) => {
            if (user != null)
                this.setState(Object.assign(this.state, { usuario: user }));
        }).bind(this));
    }

    onUserNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { username: ev.target.value });
        this.setState(newState);
    }

    onPasswordChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { password: ev.target.value });
        this.setState(newState);
    }

    onNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { name: ev.target.value });
        this.setState(newState);
    }

    onEmailChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { email: ev.target.value });
        this.setState(newState);
    }

    onCepChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { cep: ev.target.value });
        this.setState(newState);
    }

    onEnderecoChange(ev: React.ChangeEvent<HTMLInputElement>) {
        var newState = Object.assign(this.state);
        newState.usuario = Object.assign(newState.usuario, { endereco: ev.target.value });
        this.setState(newState);
    }

    onSave(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        utils.postJSON("/usuarios/save", this.state.usuario).fail(() => {
            alert('Não foi possivel cadastrar o usuário.');
        }).done(function (x) {
            alert('Cadastrado com sucesso!');
        });
    }

    render() {
        return (
            <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                <div className="col-sm-12">
                    <div>Login:</div>
                    <input type="text" value={this.state.usuario.username} style={{ width: "300px" }} onChange={this.onUserNameChange} />
                </div>
                <div className="col-sm-12">
                    <div>Senha:</div>
                    <input type="password" value={this.state.usuario.password} style={{ width: "300px" }} onChange={this.onPasswordChange} />
                </div>
                <div className="col-sm-12">
                    <div>Nome:</div>
                    <input type="text" value={this.state.usuario.name} style={{ width: "300px" }} onChange={this.onNameChange} />
                </div>
                <div className="col-sm-12">
                    <div>E-mail:</div>
                    <input type="text" value={this.state.usuario.email} style={{ width: "300px" }} onChange={this.onEmailChange} />
                </div>
                <div className="col-sm-12">
                    <div>CEP:</div>
                    <input type="text" value={this.state.usuario.cep} style={{ width: "300px" }} onChange={this.onCepChange} />
                </div>
                <div className="col-sm-12">
                    <div>Endereço:</div>
                    <input type="text" value={this.state.usuario.endereco} style={{ width: "300px" }} onChange={this.onEnderecoChange} />
                </div>
                <div className="col-sm-12">
                    <br />
                    <input type="button" className="btn btn-primary btn-lg" value="Cadastrar" onClick={this.onSave}></input>
                </div>
            </div>
        );
    }
}
