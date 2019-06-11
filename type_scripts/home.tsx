import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as utils from './utils';
import { Produto } from './models';

export class Home extends React.Component<{}, { produtos: Produto[] }> {
    constructor(props) {
        super(props);
        this.state = { produtos: [] };

        this.carregaProdutos = this.carregaProdutos.bind(this);

        this.carregaProdutos();
    }

    carregaProdutos() {
        utils.postJSON("/produtos", { emEstoque: true }).done(((produtos: Produto[]) => {
            this.setState(Object.assign(this.state, { produtos: produtos }));
        }).bind(this));
    }

    onProdutoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ borderBottom: "1px solid #ccc" }}>
                    <div id="carousel1" className="carousel slide" data-ride="carousel" style={{ width: "100%", backgroundColor: "#FFF" }}>
                        <ol className="carousel-indicators" style={{ marginBottom: "2px" }}>
                            <li data-target="#carousel1" data-slide-to="0" style={{ backgroundColor: "purple" }} className="active"></li>
                            <li data-target="#carousel1" data-slide-to="1" style={{ backgroundColor: "purple" }} className=""></li>
                            <li data-target="#carousel1" data-slide-to="2" style={{ backgroundColor: "purple" }} className=""></li>
                            <li data-target="#carousel1" data-slide-to="3" style={{ backgroundColor: "purple" }} className=""></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item first-slide">
                                <div className="">
                                    <img className="d-block" style={{ margin: "auto", height: "400px" }} src="../static/images/bunner.jpg" />
                                </div>
                            </div>

                            <div className="carousel-item active second-slide">
                                <div className="">
                                    <img className="d-block" style={{ margin: "auto", height: "400px" }} src="../static/images/Kit-Shampoo-Colonia-e-Condicionador-Sanol-Dog-2.png" />
                                </div>
                                {}
                            </div>
                            <div className="carousel-item third-slide">
                                <div className="">
                                    <img className="d-block" style={{ margin: "auto", height: "400px" }} src="../static/images/brinquedo-arranhador-para-gatos-creme-cbr03327-11825217.jpg" />
                                </div>
                                {}
                            </div>
                            <div className="carousel-item four-slide">
                                <div className="">
                                    <img className="d-block" style={{ margin: "auto", height: "400px" }} src="../static/images/guardar-brinquedos-2.png" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row" style={{ backgroundColor: "white", padding: "32px" }}>
                    {this.state.produtos.length <= 0 ?
                        (<div>Carregando...</div>) :
                        (this.state.produtos.slice(0, 4).map(p => (
                            <div className="col-sm-3" style={{ textAlign: "center" }}>
                                <div>
                                    <img style={{ maxHeight: "160px" }} src={"../static/images/" + p.imagem} />
                                </div>
                                <div style={{ color: "gray" }}>{p.nome}</div>
                                <div style={{ color: "gray" }}>{"R$ " + p.valor}</div>
                            </div>
                        )))}
                </div>
            </div>
        );
    }
}