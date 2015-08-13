import json
import os
from flask import jsonify, render_template, send_from_directory, request
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


@app.route('/metacritic/mashape_key')
def api_key():
    if env == 'development':
        return 'J6nENosAcVmshJor9sHzgZK57eytp1b7L1OjsnGyeGCxTUJmxt'
    else:
        return 'YBo0ebygCLmsh4IWOFt0PD3VO3VPp1l8LwajsnZUYQGT74zTFK'


@app.route('/api/movies', methods=['GET'])
@login_required
def get_movies():
    return json.dumps([movie.serialize for movie in models.Movie.query.all()])


@app.route('/api/movies/watched', methods=['GET'])
@login_required
def get_watched_movies():
    movies = models.Movie.query.filter_by(api_watched=True).all()
    return json.dumps([movie.serialize for movie in movies])


@app.route('/api/movies', methods=['POST'])
def add_movie():
    movie = models.Movie.query.filter_by(name=request.json['name']).first()
    if movie is None:
        movie = models.Movie()
        movie.init(request.json)
        db.session.add(movie)
    else:
        movie.__dict__.update(request.json)
    db.session.commit()
    return jsonify(movie.serialize)


@app.route('/api/movies', methods=['PUT'])
def update_movie():
    movie = models.Movie.query.filter_by(name=request.json['name']).first()
    movie.init(request.json)
    db.session.commit()
    return jsonify(movie.serialize)


@app.route('/api/movies/<string:movie_name>', methods=['DELETE'])
def delete_movie(movie_name):
    movie = models.Movie.query.filter_by(name=movie_name).first()
    db.session.delete(movie)
    db.session.commit()
    return jsonify({'deleted': True})

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_task(movie_id):
    movie = models.Movie.query.get(movie_id)
    if movie is None:
        abort(404)
    return jsonify(movie.serialize)
