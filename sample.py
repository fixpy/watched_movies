from app import db, models

# movie = models.Movie(name='Heat', director='Michael Mann', year=1995)
# db.session.add(movie)
# db.session.commit()

# movie = models.Movie(name='Taxi Driver', director='Martin Scorsese', year=1976)
# db.session.add(movie)
# db.session.commit()

# movies = models.Movie.query.all()

# movie = models.Movie.query.get(1)

movie1 = models.Movie.query.get(1)
db.session.delete(movie1)

movie2 = models.Movie.query.get(2)
db.session.delete(movie2)
db.session.commit()
# user = models.User(username='mehran', display_name='Mehran Hatami', password='123456')