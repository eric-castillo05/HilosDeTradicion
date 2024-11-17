from flask import Flask

from flaskr.Config import Config
from flaskr.utils import Firestore
from flaskr.utils.MySQLConnection import MySQLConnection


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    try:
        app.config['db'] = Firestore().client
        app.config['db'] = MySQLConnection()
    except Exception as e:
        raise RuntimeError(f'Failed to initialize Firebase or Firestore or MySQL: {str(e)}')

    return app