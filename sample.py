import json, os
# from app import db, models

# movie = models.Movie(name='Heat', director='Michael Mann', year=1995)
# db.session.add(movie)
# db.session.commit()

# movie = models.Movie(name='Taxi Driver', director='Martin Scorsese', year=1976)
# db.session.add(movie)
# db.session.commit()

# movies = models.Movie.query.all()

# movie = models.Movie.query.get(1)

# movie1 = models.Movie.query.get(1)
# db.session.delete(movie1)

# movie2 = models.Movie.query.get(2)
# db.session.delete(movie2)
# db.session.commit()
# user = models.User(username='mehran', display_name='Mehran Hatami', password='123456')

# movies = models.Movie.query.filter_by(api_watched=True).all()
# print(json.dumps([movie.serialize for movie in movies]))

# models.Movie.query.delete()

# user = models.User.query.filter_by(username='mehran').first()
# user.display_name = 'Mehran Hatami'
# db.session.commit()

# movie = models.Movie.query.filter_by(api_owner=None).first()
# movie.api_owner = 'mehran'
# db.session.commit()

# data = models.Movie.query.filter_by(api_owner=None).all()
# print(json.dumps([movie.serialize for movie in data]))

# models.User.query.delete()
# db.session.commit()