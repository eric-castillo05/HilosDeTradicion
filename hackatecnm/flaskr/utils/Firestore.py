from firebase_admin import firestore

from flaskr.utils import FirebaseApp
from flaskr.utils.singleton_meta import SingletonMeta


class Firestore(metaclass=SingletonMeta):
    _instance = None
    _client = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Firestore, cls).__new__(cls)
        return cls._instance

    @property
    def client(self):
        if self._client is None:
            FirebaseApp().app
            self._client = firestore.client()
        return self._client
