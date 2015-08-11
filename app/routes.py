import json
import os
from flask import jsonify, render_template, send_from_directory
from app import app
from app import db, models
from flask.ext.login import login_required, current_user

env = os.environ.get('ENV', 'development')


@app.route('/')
@login_required
def index():
    return app.send_static_file('index.html')


@app.route('/user')
@login_required
def user():
    return jsonify(current_user.serialize)
    # if current_user.is_authenticated():
    #     return jsonify(current_user.serialize)
    # return jsonify({'isAuthenticated' : False})


@app.route('/metacritic/mashape_key')
def api_key():
    if env == 'development':
        return 'J6nENosAcVmshJor9sHzgZK57eytp1b7L1OjsnGyeGCxTUJmxt'
    else:
        return 'YBo0ebygCLmsh4IWOFt0PD3VO3VPp1l8LwajsnZUYQGT74zTFK'


@app.route('/api/v1.0/movies', methods=['GET'])
def get_movies():
    return json.dumps([movie.serialize for movie in models.Movie.query.all()])


@app.route('/api/v1.0/movies/<int:movie_id>', methods=['GET'])
def get_task(movie_id):
    movie = models.Movie.query.get(movie_id)
    if movie is None:
        abort(404)
    return jsonify(movie.serialize)
