from flaskr.models.artesano import db

class Transaccion(db.Model):
    __tablename__ = 'transacciones'

    transaccion_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('ordenes.order_id'))
    fecha_transaccion = db.Column(db.Date, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_total = db.Column(db.Numeric(10, 2), nullable=False)
    estado = db.Column(db.Enum('completada', 'en proceso', 'cancelada'), nullable=False)

    def to_dict(self):
        return {
            'transaccion_id': self.transaccion_id,
            'order_id': self.order_id,
            'fecha_transaccion': str(self.fecha_transaccion),  # Convertir a cadena para JSON
            'cantidad': self.cantidad,
            'precio_total': float(self.precio_total),  # Convertir el precio total a float
            'estado': self.estado
        }
