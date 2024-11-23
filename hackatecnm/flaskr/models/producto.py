# flaskr/models/producto.py

from flaskr.models.artesano import db
from sqlalchemy import Numeric  # Cambiamos Decimal por Numeric

class Producto(db.Model):
    __tablename__ = 'productos'

    producto_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    precio = db.Column(Numeric(10,2), nullable=False)  # Usando Numeric en lugar de Decimal
    categoria = db.Column(db.String(255), nullable=False)
    cantidad_en_stock = db.Column(db.Integer, default=0)
    artesano_id = db.Column(db.Integer, db.ForeignKey('artesanos.artesano_id'), nullable=False)
    disponibilidad = db.Column(db.Integer, default=0)
    fecha_registro = db.Column(db.Date, nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Producto {self.nombre}>'

    def to_dict(self):
        return {
            'producto_id': self.producto_id,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'precio': float(self.precio) if self.precio else 0.0,
            'cantidad_en_stock': self.cantidad_en_stock,
            'artesano_id': self.artesano_id,
            'fecha_registro': str(self.fecha_registro),
            'url': self.url
        }