from flask import render_template
from app import app
from flask import request, redirect
from app import db
from app.models.tables import User

@app.route("/index/")
@app.route("/")
def index():
    return render_template('index.html')

import json

@app.route("/login", methods=['GET', 'POST'])
def login():
    # usuarios = list(User.query.all())
    # return "Bem vindo = %s" % (json.dumps([ u.username for u in usuarios]))
    login = request.form.get('login')
    senha = request.form.get('senha')
    
    if login != None and senha != None:
        u = User.query.filter_by(username=login, password=senha).first()
        if u != None:
            return redirect('/', code=302)
        else:
            return "Acesso Negado!"
    
    return render_template('login.html')
