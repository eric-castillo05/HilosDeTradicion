from datetime import datetime
from flaskr.extensions import db

from flaskr.models import Comprador


class CompradorService:
    @staticmethod
    def create_comprador(nombre, email):
        try:
            # Validar si ya existe un comprador con ese email
            if Comprador.query.filter_by(email=email).first():
                raise Exception("El email ya está registrado.")

            nuevo_comprador = Comprador(
                nombre=nombre,
                email=email,
                fecha_registro=datetime.now().date()
            )
            db.session.add(nuevo_comprador)
            db.session.commit()
            return nuevo_comprador.to_dict()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al crear comprador: {str(e)}")

    @staticmethod
    def get_comprador(comprador_id):
        comprador = Comprador.query.get(comprador_id)
        if not comprador:
            raise Exception("Comprador no encontrado.")
        return comprador.to_dict()

    @staticmethod
    def update_comprador(comprador_id, data):
        try:
            comprador = Comprador.query.get_or_404(comprador_id)
            if 'nombre' in data:
                comprador.nombre = data['nombre']
            if 'email' in data:
                # Validar si el email ya pertenece a otro comprador
                if Comprador.query.filter(Comprador.email == data['email'], Comprador.comprador_id != comprador_id).first():
                    raise Exception("El email ya está en uso por otro comprador.")
                comprador.email = data['email']
            db.session.commit()
            return comprador.to_dict()
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al actualizar comprador: {str(e)}")

    @staticmethod
    def delete_comprador(comprador_id):
        try:
            comprador = Comprador.query.get_or_404(comprador_id)
            db.session.delete(comprador)
            db.session.commit()
            return {"message": f"Comprador con ID {comprador_id} eliminado correctamente."}
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al eliminar")
