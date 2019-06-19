import * as utils from './utils';
import { Produto } from './models';
import * as $ from 'jquery';

export class DataSource {
    __cache = {};

    constructor() {
        this.getProdutos = this.getProdutos.bind(this);
        this.getProdutoById = this.getProdutoById.bind(this);
    }

    getProdutos() {
        var xhr = utils.postJSON("/produtos", { emEstoque: true }).then(((produtos: Produto[]) => {
            this.__cache["produtos"] = produtos;
        }).bind(this));

        if (this.__cache["produtos"]) {
            return $.when(this.__cache["produtos"]);
        } else {
            return xhr;
        }
    }

    getProdutoById(_id: Number): Produto {
        return this.__cache["produtos"].filter(p => p.id == _id).pop();
    }
}
