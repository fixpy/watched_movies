#!flask/bin/python
import sys, os
from flask import Flask, jsonify, render_template

app = Flask(__name__, static_folder='client', static_url_path='', template_folder='client')
args = sys.argv[1:]

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
    return render_template('index.html')

@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})

server_port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(debug=True, port=server_port)