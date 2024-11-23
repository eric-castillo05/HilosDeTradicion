from flaskr.extensions import db

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    order_item_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('ordenes.order_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Relación con producto
    producto = db.relationship('Producto', backref='order_items', lazy=True)
