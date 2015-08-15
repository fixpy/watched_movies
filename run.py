#!flask/bin/python
import os
from flask import send_from_directory
from app import app

port = int(os.environ.get('PORT', 5000))

# @app.route('/bower_components/<path:path>')
# def public_folder(path):
#   basedir = os.path.abspath(os.path.dirname(__file__))
#   return send_from_directory(basedir + '/../bower_components', path)

if __name__ == '__main__':
    app.run(debug=True, port=port, host='0.0.0.0')