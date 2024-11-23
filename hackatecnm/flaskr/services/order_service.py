from datetime import datetime

from flaskr.extensions import db
from flaskr.models import Transaccion, Orden, Producto, OrderItem


class OrdenService:
    @staticmethod
    def create_orden(comprador_id, items):
        try:
            # Crear la orden
            nueva_orden = Orden(
                comprador_id=comprador_id,
                fecha_creacion=datetime.now().date(),
                estado='pendiente'
            )
            db.session.add(nueva_orden)
            db.session.flush()  # Para obtener el ID de la orden

            # Crear los items de la orden
            total = 0
            for item in items:
                producto = Producto.query.get(item['producto_id'])
                if not producto:
                    raise Exception(f"Producto {item['producto_id']} no encontrado")
                
                if producto.cantidad_en_stock < item['quantity']:
                    raise Exception(f"Stock insuficiente para producto {producto.nombre}")
                
                order_item = OrderItem(
                    order_id=nueva_orden.order_id,
                    product_id=item['producto_id'],
                    quantity=item['quantity'],
                    price=producto.precio
                )
                db.session.add(order_item)
                
                # Actualizar stock
                producto.cantidad_en_stock -= item['quantity']
                total += float(producto.precio) * item['quantity']

            # Crear la transacción
            transaccion = Transaccion(
                order_id=nueva_orden.order_id,
                fecha_transaccion=datetime.now().date(),
                cantidad=sum(item['quantity'] for item in items),
                precio_total=total,
                estado='en proceso'
            )
            db.session.add(transaccion)
            
            db.session.commit()
            return nueva_orden
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al crear orden: {str(e)}")

    @staticmethod
    def update_orden_estado(orden_id, nuevo_estado):
        try:
            orden = Orden.query.get_or_404(orden_id)
            orden.estado = nuevo_estado
            
            # Actualizar estado de la transacción
            transaccion = Transaccion.query.filter_by(order_id=orden_id).first()
            if transaccion:
                if nuevo_estado == 'completada':
                    transaccion.estado = 'completada'
                elif nuevo_estado == 'cancelada':
                    transaccion.estado = 'cancelada'
                    # Devolver productos al inventario
                    for item in orden.order_items:
                        producto = Producto.query.get(item.product_id)
                        producto.cantidad_en_stock += item.quantity
            
            db.session.commit()
            return orden
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar estado de orden: {str(e)}")
