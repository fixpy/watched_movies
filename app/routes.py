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
    filename = os.path.abspath(os.path.dirname(__file__)) + '/../secrets.json'
    if not os.path.isfile(filename):
        return '0000000000000000000000000000'

    env_type = 'prod'
    if env == 'development':
        env_type = 'dev'
    with open('secrets.json') as secrets:
        data = json.load(secrets)
        return data['mashape'][env_type]


@app.route('/api/movies', methods=['GET'])
@login_required
def get_movies():
    movies = models.Movie.query.filter_by(
        api_owner=current_user.username).all()
    return json.dumps([movie.serialize for movie in movies])


@app.route('/api/movies/watched', methods=['GET'])
@login_required
def get_watched_movies():
    movies = models.Movie.query.filter_by(
        api_owner=current_user.username, api_watched=True).all()
    return json.dumps([movie.serialize for movie in movies])


@app.route('/api/movies', methods=['POST'])
def add_movie():
    movie = models.Movie.query.filter_by(name=request.json['name']).first()
    if movie is None:
        movie = models.Movie()
        movie.init(request.json)
        movie.api_owner = current_user.username
        db.session.add(movie)
    else:
        movie.init(request.json)
        movie.api_owner = current_user.username
    db.session.commit()
    return jsonify(movie.serialize)


@app.route('/api/movies', methods=['PUT'])
def update_movie():
    movie = models.Movie.query.filter_by(name=request.json['name']).first()

    if movie is None:
        movie = models.Movie()
        movie.init(request.json)
        movie.api_owner = current_user.username
        db.session.add(movie)
    else:
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
