#!flask/bin/python
import os
import mimetypes
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
env = os.environ.get('ENV', 'development')
public_folder = '../client'
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('text/html ', '.html')
# print env
# if env == 'production':
#     public_folder = '../public'
app = Flask('app', static_folder=public_folder, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)

from app import routes, models