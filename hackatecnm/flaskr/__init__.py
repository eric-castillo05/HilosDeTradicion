from flask import Flask

from flaskr.Config import Config
from flaskr.extensions import db
from flaskr.routes import comprador_route
from flaskr.routes.artesano_route import artesanos_bp
from flaskr.routes.comprador_route import compradores_bp
from flaskr.routes.orden_route import orden_bp
from flaskr.routes.producto_route import producto_bp
from flaskr.utils import Firestore
from flaskr.utils.MySQLConnection import MySQLConnection

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    try:
        app.config['db'] = Firestore().client
        app.config['db'] = MySQLConnection()

    except Exception as e:
        raise RuntimeError(f'Failed to initialize Firebase or Firestore or MySQL: {str(e)}')



    with app.app_context():
        db.create_all()

    app.register_blueprint(artesanos_bp)
    app.register_blueprint(compradores_bp)
    app.register_blueprint(producto_bp)
    app.register_blueprint(orden_bp)


    return app