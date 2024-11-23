# flaskr/routes/artesanos.py

from flask import Blueprint, request, jsonify
from http import HTTPStatus
from flaskr.services.artesano_service import ArtesanoService
from flaskr.models.artesano import Artesano, db
from datetime import datetime

artesanos_bp = Blueprint('artesanos', __name__, url_prefix='/artesanos')

@artesanos_bp.route('/', methods=['GET'])
def listar_artesanos():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        artesanos = Artesano.query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        return jsonify({
            'artesanos': [artesano.to_dict() for artesano in artesanos.items],
            'total': artesanos.total,
            'pages': artesanos.pages,
            'current_page': artesanos.page
        }), HTTPStatus.OK

    except Exception as e:
        return jsonify({
            'error': str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@artesanos_bp.route('/<int:artesano_id>', methods=['GET'])
def obtener_artesano(artesano_id):
    try:
        artesano = Artesano.query.get_or_404(artesano_id)
        return jsonify(artesano.to_dict()), HTTPStatus.OK
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), HTTPStatus.NOT_FOUND

@artesanos_bp.route('/', methods=['POST'])
def crear_artesano():
    try:
        data = request.get_json()

        if not all(key in data for key in ['nombre', 'region']):
            return jsonify({
                'error': 'Los campos nombre y region son requeridos'
            }), HTTPStatus.BAD_REQUEST

        nuevo_artesano = Artesano(
            nombre=data['nombre'],
            region=data['region'],
            descripcion=data.get('descripcion', ''),
            fecha_registro=datetime.now().date()
        )

        db.session.add(nuevo_artesano)
        db.session.commit()

        return jsonify(nuevo_artesano.to_dict()), HTTPStatus.CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@artesanos_bp.route('/<int:artesano_id>', methods=['PUT'])
def actualizar_artesano(artesano_id):
    try:
        artesano = Artesano.query.get_or_404(artesano_id)
        data = request.get_json()

        if 'nombre' in data:
            artesano.nombre = data['nombre']
        if 'region' in data:
            artesano.region = data['region']
        if 'descripcion' in data:
            artesano.descripcion = data['descripcion']

        db.session.commit()
        return jsonify(artesano.to_dict()), HTTPStatus.OK

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@artesanos_bp.route('/<int:artesano_id>', methods=['DELETE'])
def eliminar_artesano(artesano_id):
    try:
        artesano = Artesano.query.get_or_404(artesano_id)
        db.session.delete(artesano)
        db.session.commit()

        return jsonify({
            'message': f'Artesano {artesano_id} eliminado correctamente'
        }), HTTPStatus.OK

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e)
        }), HTTPStatus.INTERNAL_SERVER_ERROR