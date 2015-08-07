#!flask/bin/python
import os
from flask import send_from_directory
from app import app

port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(debug=True, port=port, host='0.0.0.0')