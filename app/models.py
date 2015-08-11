#!flask/bin/python
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask.ext.login import UserMixin
from . import login_manager

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(64), unique=True, index=True)
    display_name = db.Column(db.String(64), index=True, unique=False)
    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @property
    def serialize(self):
        return {
            'isAuthenticated': True,
            'username': self.username,
            'email': self.email
        }

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    director = db.Column(db.String(64), index=False, unique=False)
    year = db.Column(db.Integer, index=False, unique=False)

    def __repr__(self):
        return '<Movie %r>' % (self.name)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'director': self.director,
            'year': self.year
        }