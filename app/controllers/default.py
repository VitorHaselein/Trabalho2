import json
from flask import render_template
from app import app
from flask import request, redirect, jsonify
from app import db
from app.models.tables import User


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
