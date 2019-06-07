import json
from flask import render_template
from app import app
from flask import request, redirect, jsonify
from app import db
from app.models.tables import User, Produto
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
            return jsonify({"success": True})
    return jsonify({"success": False})


@app.route("/produtos", methods=['GET', 'POST'])
def produtos():
    produtos = list(Produto.query.all())
    produtos = json.loads(json.dumps(produtos, cls=AlchemyEncoder))
    return jsonify(produtos)


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
