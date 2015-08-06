import json
from flask import jsonify, render_template, send_from_directory
from app import app
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

@app.route('/metacritic/mashape_key')
def api_key():
    with open('secrets.json') as secrets_json:
        secrets = json.load(secrets_json)
        return secrets['mashape']['key']

@app.route('/api/v1.0/movies', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})