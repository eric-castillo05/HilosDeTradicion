from flaskr.models import Transaccion
from flaskr.extensions import db

class TransaccionService:
    @staticmethod
    def get_transaccion(transaccion_id):
        return Transaccion.query.get_or_404(transaccion_id)

    @staticmethod
    def update_transaccion_estado(transaccion_id, nuevo_estado):
        try:
            transaccion = Transaccion.query.get_or_404(transaccion_id)
            transaccion.estado = nuevo_estado
            db.session.commit()
            return transaccion
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar estado de transacción: {str(e)}")
