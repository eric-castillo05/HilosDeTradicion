from flask import Blueprint, request, jsonify
from http import HTTPStatus

from flaskr.models import Comprador
from flaskr.services.comprador_service import CompradorService

compradores_bp = Blueprint('compradores', __name__, url_prefix='/compradores')

@compradores_bp.route('/', methods=['GET'])
def listar_compradores():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        compradores = Comprador.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'compradores': [comprador.to_dict() for comprador in compradores.items],
            'total': compradores.total,
            'pages': compradores.pages,
            'current_page': compradores.page
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@compradores_bp.route('/<int:comprador_id>', methods=['GET'])
def obtener_comprador(comprador_id):
    try:
        comprador = CompradorService.get_comprador(comprador_id)
        return jsonify(comprador), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.NOT_FOUND


@compradores_bp.route('/', methods=['POST'])
def crear_comprador():
    try:
        data = request.get_json()

        if not all(key in data for key in ['nombre', 'email']):
            return jsonify({'error': 'Los campos "nombre" y "email" son requeridos.'}), HTTPStatus.BAD_REQUEST

        comprador = CompradorService.create_comprador(data['nombre'], data['email'])
        return jsonify(comprador), HTTPStatus.CREATED
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@compradores_bp.route('/<int:comprador_id>', methods=['PUT'])
def actualizar_comprador(comprador_id):
    try:
        data = request.get_json()
        comprador = CompradorService.update_comprador(comprador_id, data)
        return jsonify(comprador), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@compradores_bp.route('/<int:comprador_id>', methods=['DELETE'])
def eliminar_comprador(comprador_id):
    try:
        resultado = CompradorService.delete_comprador(comprador_id)
        return jsonify(resultado), HTTPStatus.OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR