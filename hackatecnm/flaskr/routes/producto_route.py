from flask import Blueprint, request, jsonify
from http import HTTPStatus
from flaskr.models.producto import Producto
from flaskr.services import ProductoService
from flaskr.extensions import db

producto_bp = Blueprint('productos', __name__, url_prefix='/productos')

@producto_bp.route('/', methods=['GET'])
def listar_productos():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        productos = Producto.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'productos': [producto.to_dict() for producto in productos.items],
            'total': productos.total,
            'pages': productos.pages,
            'current_page': productos.page
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

# Obtener un producto específico por ID
@producto_bp.route('/<int:producto_id>', methods=['GET'])
def obtener_producto(producto_id):
    try:
        producto = ProductoService.get_producto(producto_id)
        return jsonify(producto.to_dict()), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.NOT_FOUND

# Crear un nuevo producto
@producto_bp.route('/', methods=['POST'])
def crear_producto():
    try:
        # Obtener datos del formulario (form-data)
        nombre = request.form.get('nombre')
        descripcion = request.form.get('descripcion')
        precio = request.form.get('precio')
        categoria = request.form.get('categoria')
        artesano_id = request.form.get('artesano_id')
        disponibilidad = request.form.get('disponibilidad')
        cantidad_en_stock = request.form.get('cantidad_en_stock')

        # Validar los campos obligatorios
        if not all([nombre, descripcion, precio, categoria, artesano_id]):
            return jsonify({'error': 'Los campos "nombre", "descripcion", "precio", "categoria" y "artesano_id" son requeridos.'}), HTTPStatus.BAD_REQUEST

        # Obtener la imagen del archivo (si existe)
        imagen = request.files.get('imagen')

        # Crear el nuevo producto con los datos recibidos
        producto = ProductoService.create_producto(
            nombre=nombre,
            descripcion=descripcion,
            precio=precio,
            categoria=categoria,
            artesano_id=artesano_id,
            disponibilidad=disponibilidad,
            cantidad_en_stock=cantidad_en_stock,
            imagen=imagen  # Pasamos la imagen aquí
        )

        return jsonify(producto.to_dict()), HTTPStatus.CREATED
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


# Actualizar un producto existente
@producto_bp.route('/<int:producto_id>', methods=['PUT'])
def actualizar_producto(producto_id):
    try:
        # Obtener datos del formulario (form-data)
        nombre = request.form.get('nombre')
        descripcion = request.form.get('descripcion')
        precio = request.form.get('precio')
        categoria = request.form.get('categoria')
        cantidad_en_stock = request.form.get('cantidad_en_stock')
        disponibilidad = request.form.get('disponibilidad')
        artesano_id = request.form.get('artesano_id')  # Asumimos que este campo no cambiará

        # Validar los campos obligatorios
        if not all([nombre, descripcion, precio, categoria, cantidad_en_stock, artesano_id]):
            return jsonify({'error': 'Los campos "nombre", "descripcion", "precio", "categoria", "cantidad_en_stock" y "artesano_id" son requeridos.'}), HTTPStatus.BAD_REQUEST

        # Convertir disponibilidad a un valor entero (1 o 0)
        if disponibilidad is not None:
            disponibilidad = 1 if disponibilidad.strip().lower() in ['1', 'true'] else 0

        # Obtener la imagen del archivo (si existe)
        imagen = request.files.get('imagen')

        # Obtener el producto a actualizar
        producto = Producto.query.get_or_404(producto_id)

        # Actualizar los campos del producto
        producto.nombre = nombre
        producto.descripcion = descripcion
        producto.precio = float(precio)
        producto.categoria = categoria
        producto.cantidad_en_stock = int(cantidad_en_stock)
        producto.disponibilidad = disponibilidad
        producto.artesano_id = int(artesano_id)

        # Si se proporcionó una nueva imagen, subimos la imagen
        if imagen:
            imagen_url = ProductoService.upload_image_to_firebase(imagen)
            producto.url = imagen_url  # Actualizamos la URL de la imagen

        # Guardar cambios en la base de datos
        db.session.commit()

        # Retornar la respuesta con los detalles del producto actualizado
        return jsonify(producto.to_dict()), HTTPStatus.OK

    except Exception as e:
        db.session.rollback()  # En caso de error, revertir cambios
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


# Eliminar un producto
@producto_bp.route('/<int:producto_id>', methods=['DELETE'])
def eliminar_producto(producto_id):
    try:
        producto = Producto.query.get_or_404(producto_id)
        db.session.delete(producto)
        db.session.commit()

        return jsonify({'message': 'Producto eliminado exitosamente'}), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
