#!flask/bin/python

from app import db

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    director = db.Column(db.String(64), index=False, unique=False)
    year = db.Column(db.Integer, index=False, unique=False)

    def __repr__(self):
        return '<Movie %r>' % (self.name)