import uuid
from datetime import datetime

from flaskr.extensions import db
from flaskr.models import Producto
from flaskr.utils import StorageBucket
from werkzeug.utils import secure_filename


class ProductoService:
    @staticmethod
    def upload_image_to_firebase(file):
        try:
            if not file:
                return None

            # Crear un nombre único para el archivo
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"

            # Subir archivo a Firebase Storage
            bucket = StorageBucket().storage_bucket
            blob = bucket.blob(f"productos/{unique_filename}")

            # Subir el archivo
            blob.upload_from_string(
                file.read(),
                content_type=file.content_type
            )

            # Hacer la URL pública
            blob.make_public()

            return blob.public_url
        except Exception as e:
            raise Exception(f"Error al subir imagen: {str(e)}")

    @staticmethod
    def create_producto(nombre, descripcion, precio, categoria, artesano_id,
                        disponibilidad, cantidad_en_stock, imagen=None):
        try:
            # Subir imagen si existe
            imagen_url = None
            if imagen:
                imagen_url = ProductoService.upload_image_to_firebase(imagen)

            nuevo_producto = Producto(
                nombre=nombre,
                descripcion=descripcion,
                precio=precio,
                categoria=categoria,
                artesano_id=artesano_id,
                disponibilidad=disponibilidad,
                cantidad_en_stock=cantidad_en_stock,
                url=imagen_url,  # Guardamos la URL aquí
                fecha_registro=datetime.now().date()
            )
            db.session.add(nuevo_producto)
            db.session.commit()
            return nuevo_producto
        except Exception as e:
            db.session.rollback()
            raise Exception(f"Error al crear producto: {str(e)}")

    @staticmethod
    def get_producto(producto_id):
        try:
            # Buscar el producto por ID
            producto = Producto.query.get(producto_id)

            # Si no se encuentra el producto, lanzar excepción
            if not producto:
                raise Exception(f"Producto con ID {producto_id} no encontrado.")

            return producto
        except Exception as e:
            raise Exception(f"Error al obtener producto: {str(e)}")
