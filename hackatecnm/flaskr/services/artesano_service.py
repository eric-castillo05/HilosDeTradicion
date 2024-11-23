from datetime import datetime
from flaskr.extensions import db
from flaskr.utils import MySQLConnection

class ArtesanoService:
    @staticmethod
    def create_artesano(nombre, region, descripcion):
        try:
            query = """
                INSERT INTO artesanos (nombre, region, descripcion, fecha_registro)
                VALUES (%s, %s, %s, %s)
            """
            params = (nombre, region, descripcion, datetime.now().date())

            artesano_id = db.execute_query(query, params)

            return {
                'artesano_id': artesano_id,
                'nombre': nombre,
                'region': region,
                'descripcion': descripcion
            }
        except Exception as e:
            raise Exception(f"Error al crear artesano: {str(e)}")

    @staticmethod
    def get_artesano(artesano_id):
        try:
            db = MySQLConnection()
            query = "SELECT * FROM artesanos WHERE artesano_id = %s"
            result = db.execute_query(query, (artesano_id,))

            if not result:
                raise Exception("Artesano no encontrado")

            return result[0]
        except Exception as e:
            raise Exception(f"Error al obtener artesano: {str(e)}")

    @staticmethod
    def update_artesano(artesano_id, data):
        try:
            db = MySQLConnection()
            query = """
                UPDATE artesanos 
                SET nombre = %s, region = %s, descripcion = %s
                WHERE artesano_id = %s
            """
            params = (
                data.get('nombre'),
                data.get('region'),
                data.get('descripcion'),
                artesano_id
            )

            db.execute_query(query, params)
            return ArtesanoService.get_artesano(artesano_id)
        except Exception as e:
            raise Exception(f"Error al actualizar artesano: {str(e)}")
