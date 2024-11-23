from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from flaskr.extensions import db

class Comprador(db.Model):
    __tablename__ = 'compradores'

    comprador_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    fecha_registro = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    # Relación con órdenes
    ordenes = db.relationship('Orden', backref='comprador', lazy=True)

    def to_dict(self):
        return {
            'comprador_id': self.comprador_id,
            'nombre': self.nombre,
            'email': self.email,
            'fecha_registro': str(self.fecha_registro)
        }
