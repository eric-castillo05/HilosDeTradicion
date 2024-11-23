from flaskr.extensions import db

class Artesano(db.Model):
    __tablename__ = 'artesanos'

    artesano_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(255), nullable=False)
    region = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    fecha_registro = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Artesano {self.nombre}>'

    def to_dict(self):
        return {
            'artesano_id': self.artesano_id,
            'nombre': self.nombre,
            'region': self.region,
            'descripcion': self.descripcion,
            'fecha_registro': str(self.fecha_registro)
        }