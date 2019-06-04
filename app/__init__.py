from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

import numpy as np 
import os 

from urllib.parse import urljoin
from urllib.request import pathname2url

def path2url(path):
    return urljoin('file:', pathname2url(path))

app = Flask(__name__)
#app.config.from_object('config')
p = 'sqlite:///' + path2url(os.path.join(app.root_path, 'storage.db')).replace('file:///', '')
print(p)
app.config['SQLALCHEMY_DATABASE_URI'] = p
db = SQLAlchemy(app)
migrate = Migrate(app, db)


manager = Manager(app)
manager.add_command('db', MigrateCommand)

from app.models import tables

# https://stackoverflow.com/questions/44941757/sqlalchemy-exc-operationalerror-sqlite3-operationalerror-no-such-table
db.create_all()

from app.controllers import default

