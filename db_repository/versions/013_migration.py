from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
movie = Table('movie', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('api_username', String(length=30)),
    Column('api_collection', String(length=30)),
    Column('api_review', String(length=300)),
    Column('api_rate', String(length=300)),
    Column('api_watched', Boolean),
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
    post_meta.tables['movie'].columns['api_username'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['movie'].columns['api_username'].drop()
