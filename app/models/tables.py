from app import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    name = db.Column(db.String)
    cep = db.Column(db.String)
    endereco = db.Column(db.String)
    email = db.Column(db.String, unique=True)


    def __init__(self, username, password, name, email):
        self.username = username
        self.password = password
        self.name = name
        self.email = email

    #forma bonita de mostrar o resultado da pesquisa
    def __repr__(self):
        return "<User %r>" % self.name

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.Text)
    valor = db.Column(db.Float)
    categoria = db.Column(db.Text)
    qtd = db.Column(db.Integer)
    imagem = db.Column(db.String)

class Venda(db.Model):
    __tablename__ = "vendas"
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
class ItemVenda(db.Model):
    __tablename__ = "item_venda"
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'))
    venda_id = db.Column(db.Integer, db.ForeignKey('vendas.id'))
    qtd = db.Column(db.Integer)

# class Post(db.Model):
#     __tablename__ = "posts"

#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.Text)
#     name = db.Column(db.Text)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
        
#     #devolver todos os dados quando for realizada a pesquisa, não somente o id
#     user = db.relationship('User', foreign_keys=user_id)

#     def __init__(self, content, user_id):
#         self.content = compile
#         self.user_id = user_id


#     def __repr__(self):
#         return "<Post %r>" % self.id


# class Follow(db.Model):
#     __tablename__ = "follow"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#     user = db.relationship('User', foreign_keys=user_id)
#     follower = db.relationship('User', foreign_keys=follower_id)

