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
    api_collection = db.Column(db.String(30), index=False, unique=True)
    api_review = db.Column(db.String(300), index=False, unique=False)
    api_rate = db.Column(db.String(300), index=False, unique=False)
    api_watched = db.Column(db.Boolean, index=False)
    name = db.Column(db.String(64), index=True, unique=True)
    url = db.Column(db.String(500), index=False, unique=False)
    rlsdate = db.Column(db.String(10), index=False, unique=False)
    score = db.Column(db.String(10), index=False, unique=False)
    summary = db.Column(db.String(300), index=False, unique=False)
    rating = db.Column(db.String(10), index=False, unique=False)
    cast = db.Column(db.String(300), index=False, unique=False)
    genre = db.Column(db.String(64), index=False, unique=False)
    avguserscore = db.Column(db.String(10), index=False, unique=False)
    runtime = db.Column(db.String(10), index=False, unique=False)

    def __repr__(self):
        return '<Movie %r>' % (self.name)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'api_collection': self.api_collection,
            'api_review': self.api_review,
            'api_rate': self.api_rate,
            'api_watched': self.api_watched,
            'name': self.name,
            'rlsdate': self.rlsdate,
            'summary': self.summary,
            'rating': self.rating,
            'cast': self.cast,
            'genre': self.genre,
            'avguserscore': self.avguserscore,
            'runtime': self.runtime
        }
