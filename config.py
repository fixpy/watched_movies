import os, json
basedir = os.path.abspath(os.path.dirname(__file__))
secretsFile = basedir + '/secrets.json'


def get_db_uri():
    db_uri = os.environ.get('DATABASE_URL')
    if db_uri is not None:
        return db_uri

    # default_uri = 'sqlite:///' + os.path.join(basedir, 'watched_movies.db')
    default_uri = 'postgresql://mehran:123456@localhost/watched_movies'
    if not os.path.isfile(secretsFile):
        return default_uri
    with open('secrets.json') as secrets:
        dict = json.load(secrets)
        if 'db' in dict:
            dict = dict['db']
            db_uri = 'postgresql://'
            if 'user' in dict:
                db_uri += dict['user']
            else:
                db_uri += 'mehran'

            if 'password' in dict:
                db_uri += ':' + dict['password']

            if 'host' in dict:
                db_uri += '@' + dict['host']
            else:
                db_uri += '@localhost'

            if 'name' in dict:
                db_uri += '/' + dict['name']
            else:
                db_uri += '/watched_movies'
            return db_uri
        else:
            return default_uri

SQLALCHEMY_DATABASE_URI = get_db_uri()
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
