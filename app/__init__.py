#!flask/bin/python
import os
import mimetypes
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask_bootstrap import Bootstrap

env = os.environ.get('ENV', 'development')
public_folder = '../client'
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('text/html ', '.html')

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'

# Thiss is for production mode which is not implemented yet
# print env
# if env == 'production':
#     public_folder = '../public'

app = Flask('app', static_folder=public_folder, static_url_path='')
app.config['SECRET_KEY'] = '987654321123456789'
app.config.from_object('config')
login_manager.init_app(app)
db = SQLAlchemy(app)
Bootstrap(app)

from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint, url_prefix='/auth')

from app import routes, models