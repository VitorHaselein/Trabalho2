// import * as React from 'react'
// import * as ReactDOM from 'react-dom';
// import * as utils from './utils';
// import * as queryString from 'querystring';
// import { NavLink, Router, Redirect } from 'react-router-dom';

// export class Logout extends React.Component<{ }, { }> {
//     constructor(props) {
//         super(props);

//     }

//     onLoginChange(ev: React.ChangeEvent<HTMLInputElement>) {
//         this.setState(Object.assign(this.state, { login: ev.target.value }));
//     }

//     onSenhaChange(ev: React.ChangeEvent<HTMLInputElement>) {
//         this.setState(Object.assign(this.state, { senha: ev.target.value }));
//     }

//     onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//         utils.postJSON("/login", { login: this.state.login, senha: this.state.senha }).done(((response) => {
//             if (response.success) {
//                 if (this.props.onSuccess)
//                     this.props.onSuccess(this.state.login);
//                 this.setState(Object.assign(this.state, { redirectTo: this.state.afterLoginRedirectTo }));
//             }
//         }).bind(this));
//     }

//     render() {
//         return (
//             (this.state.redirectTo ?
//                 (<Redirect to={this.state.redirectTo} />) :
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-sm-4" style={{ paddingTop: "140px" }}> </div>
//                         <div className="col-sm-4" style={{ paddingTop: "140px" }}>
//                             <div className="account-wall" style={{ padding: "10px", paddingBottom: "40px" }}>
//                                 <img className="profile-img" src="../static/images/login.jpg" alt="" />
//                                 <div>
//                                     <input type="text" name="login" id="login" className="form-control" placeholder="Email" required value={this.state.} onChange={this.onLoginChange} />
//                                     <input type="password" name="senha" id="senha" className="form-control" placeholder="Senha" required value={this.state.senha} onChange={this.onSenhaChange} onKeyPress={((e) => {
//                                         if (e.keyCode == 13)
//                                             this.onClick(null);
//                                     }).bind(this)} />
//                                     <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ marginBottom: "15px" }} onClick={this.onClick}>Entrar</button>
//                                     <a href="#" style={{ "float": "left" }}>Criar Conta</a>
//                                     <a href="#" style={{ "float": "right" }}>Esquecia a senha</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>)
//         );
//     }
// }
