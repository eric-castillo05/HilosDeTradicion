from flask import Blueprint, request, jsonify
from http import HTTPStatus

from flaskr.models import Orden
from flaskr.services import OrdenService

orden_bp = Blueprint('ordenes', __name__, url_prefix='/ordenes')

@orden_bp.route('/', methods=['POST'])
def crear_orden():
    try:
        # Obtener los datos del cuerpo de la solicitud como JSON
        data = request.get_json()

        # Verificar que los campos necesarios estén presentes
        comprador_id = data.get('comprador_id')
        items = data.get('items')

        if not comprador_id or not items:
            return jsonify({'error': 'El comprador_id y los items son requeridos.'}), HTTPStatus.BAD_REQUEST

        # Crear la orden usando el servicio
        orden = OrdenService.create_orden(comprador_id, items)

        return jsonify(orden.to_dict()), HTTPStatus.CREATED

    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@orden_bp.route('/<int:orden_id>', methods=['PUT'])
def actualizar_estado_orden(orden_id):
    try:
        # Obtener los datos del formulario (form-data)
        #nuevo_estado = request.form.get('estado')  # El nuevo estado (pendiente, completada, cancelada)
        data = request.get_json()

        nuevo_estado = data['estado']
        if not nuevo_estado:
            return jsonify({'error': 'El estado es requerido.'}), HTTPStatus.BAD_REQUEST

        # Actualizar la orden usando el servicio
        orden = OrdenService.update_orden_estado(orden_id, nuevo_estado)

        return jsonify(orden.to_dict()), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

@orden_bp.route('/<int:orden_id>', methods=['GET'])
def obtener_orden(orden_id):
    try:
        # Obtener la orden usando el servicio
        orden = Orden.query.get_or_404(orden_id)
        return jsonify(orden.to_dict()), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.NOT_FOUND
