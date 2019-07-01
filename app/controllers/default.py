import json
from flask import render_template
from app import app
from flask import request, redirect, jsonify
from app import db
from app.models.tables import User, Produto, ItemVenda, Venda
from sqlalchemy.ext.declarative import DeclarativeMeta


@app.route("/index/")
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    login = request.json['login']
    senha = request.json['senha']

    if login != None and senha != None:
        u = User.query.filter_by(username=login, password=senha).first()
        if u != None:
            return jsonify({"success": True, "user": json.dumps(u, cls=AlchemyEncoder)})
    return jsonify({"success": False})


@app.route("/produtos", methods=['GET', 'POST'])
def produtos():
    produtos = list(Produto.query.all())
    produtos = json.loads(json.dumps(produtos, cls=AlchemyEncoder))
    return jsonify(produtos)


@app.route("/produtos/getById/<id>", methods=['GET', 'POST'])
def produto_getById(id):
    produto = list(Produto.query.filter_by(id=id))
    result = json.loads(json.dumps(produto, cls=AlchemyEncoder))
    return jsonify(result[0] if len(result) > 0 else None)


@app.route("/usuarios/getById/<id>", methods=['GET', 'POST'])
def usuario_getById(id):
    usuario = list(User.query.filter_by(id=id))
    result = json.loads(json.dumps(usuario, cls=AlchemyEncoder))
    return jsonify(result[0] if len(result) > 0 else None)


@app.route("/usuarios/save", methods=['GET', 'POST'])
def usuario_save():
    id = request.json["id"]
    username = request.json["username"]
    password = request.json["password"]
    name = request.json["name"]
    email = request.json["email"]
    cep = request.json["cep"]

    if id <= 0:
        usuario = User(username, password, name, email)
        usuario.cep = cep
        db.session.add(usuario)
        db.session.commit()
    else:
        User.query.filter_by(id=id).update(
            {"name": name, "username": username, "password": password, "email": email, "cep": cep})
        db.session.commit()

    return jsonify(True)


@app.route("/vendas/finalizar", methods=['GET', 'POST'])
def venda_finalizar():
    itens_carrinho = request.json["carrinho"]
    cliente_id = request.json["cliente_id"]

    venda = Venda()
    venda.cliente_id = cliente_id

    db.session.add(venda)
    db.session.commit()

    for item_carrinho in itens_carrinho:
        iv = ItemVenda()
        iv.venda_id = venda.id
        iv.cliente_id = cliente_id
        iv.produto_id = item_carrinho["produto_id"]
        iv.qtd = item_carrinho["qtd"]
        db.session.add(iv)

    db.session.commit()

    return jsonify(True)


class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    # this will fail on non-encodable values, like other classes
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)
