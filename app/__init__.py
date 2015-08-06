#!flask/bin/python
import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
env = os.environ.get('ENV', 'development')
public_folder = '../client'

if env == 'production':
    public_folder = '../public'

# template_folder=public_folder
app = Flask(__name__, static_folder=public_folder, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)

from app import routes, models