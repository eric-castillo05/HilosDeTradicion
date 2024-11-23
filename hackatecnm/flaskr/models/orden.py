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