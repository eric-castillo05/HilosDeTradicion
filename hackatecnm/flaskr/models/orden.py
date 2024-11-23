from flaskr.extensions import db

class Orden(db.Model):
    __tablename__ = 'ordenes'

    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comprador_id = db.Column(db.Integer, db.ForeignKey('compradores.comprador_id'), nullable=False)
    fecha_creacion = db.Column(db.Date, nullable=False)
    estado = db.Column(db.Enum('pendiente', 'completada', 'cancelada'), nullable=False)

    # Relaciones directas
    order_items = db.relationship('OrderItem', backref='orden', lazy=True)
    transacciones = db.relationship('Transaccion', backref='orden', lazy=True)

    def to_dict(self):
        return {
            'order_id': self.order_id,
            'comprador_id': self.comprador_id,
            'fecha_creacion': str(self.fecha_creacion),
            'estado': self.estado,
            'order_items': [item.to_dict() for item in self.order_items],  # Asumiendo que OrderItem tiene un to_dict
            'transacciones': [transaccion.to_dict() for transaccion in self.transacciones]  # Asumiendo que Transaccion tiene un to_dict
        }
