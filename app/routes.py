import json
from flask import jsonify, render_template, send_from_directory
from app import app
from app import db, models

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/bower_components/<path:path>')
def bower_files(path):
    return send_from_directory('bower_components', path)

@app.route('/metacritic/mashape_key')
def api_key():
    with open('secrets.json') as secrets_json:
        secrets = json.load(secrets_json)
        return secrets['mashape']['key']

@app.route('/api/v1.0/movies', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/api/v1.0/movies/<int:movie_id>', methods=['GET'])
def get_task(movie_id):
    movie = models.Movie.query.get(movie_id)
    # movie = [movie for movie in movies if movie['id'] == movie_id]
    if movie is None:
        abort(404)
    return jsonify({'movie': movie})