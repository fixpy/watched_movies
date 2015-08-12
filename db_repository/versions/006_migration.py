from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
movie = Table('movie', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('name', VARCHAR(length=64)),
    Column('director', VARCHAR(length=64)),
    Column('year', INTEGER),
)

movie = Table('movie', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('name', String(length=64)),
    Column('url', String(length=500)),
    Column('rlsdate', String(length=10)),
    Column('score', String(length=10)),
    Column('summary', String(length=300)),
    Column('rating', String(length=10)),
    Column('cast', String(length=300)),
    Column('genre', String(length=64)),
    Column('avguserscore', String(length=10)),
    Column('runtime', String(length=10)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['movie'].columns['director'].drop()
    pre_meta.tables['movie'].columns['year'].drop()
    post_meta.tables['movie'].columns['avguserscore'].create()
    post_meta.tables['movie'].columns['cast'].create()
    post_meta.tables['movie'].columns['genre'].create()
    post_meta.tables['movie'].columns['rating'].create()
    post_meta.tables['movie'].columns['rlsdate'].create()
    post_meta.tables['movie'].columns['runtime'].create()
    post_meta.tables['movie'].columns['score'].create()
    post_meta.tables['movie'].columns['summary'].create()
    post_meta.tables['movie'].columns['url'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    pre_meta.tables['movie'].columns['director'].create()
    pre_meta.tables['movie'].columns['year'].create()
    post_meta.tables['movie'].columns['avguserscore'].drop()
    post_meta.tables['movie'].columns['cast'].drop()
    post_meta.tables['movie'].columns['genre'].drop()
    post_meta.tables['movie'].columns['rating'].drop()
    post_meta.tables['movie'].columns['rlsdate'].drop()
    post_meta.tables['movie'].columns['runtime'].drop()
    post_meta.tables['movie'].columns['score'].drop()
    post_meta.tables['movie'].columns['summary'].drop()
    post_meta.tables['movie'].columns['url'].drop()
