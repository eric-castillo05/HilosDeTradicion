import mysql.connector

from flaskr import Config
from flaskr.utils import SingletonMeta


class MySQLConnection(metaclass=SingletonMeta):
    _instance = None
    _initialized = False
    _pool = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MySQLConnection, cls).__new__(cls)
        return cls._instance

    @property
    def connection_pool(self):
        if not self._initialized:
            self._initialize()
        return self._pool

    def _initialize(self):
        if not self._initialized:
            try:
                dbconfig = {
                    "host": Config.MYSQL_HOST,
                    "user": Config.MYSQL_USER,
                    "password": Config.MYSQL_PASSWORD,
                    "database": Config.MYSQL_DATABASE,
                    "port": Config.MYSQL_PORT
                }

                pool_config = {
                    "pool_name": "mypool",
                    "pool_size": 5,
                    "pool_reset_session": True,
                    **dbconfig
                }

                self._pool = mysql.connector.pooling.MySQLConnectionPool(**pool_config)
                self._initialized = True
            except Exception as e:
                raise Exception(f"Error initializing MySQL connection pool: {str(e)}")

    def get_connection(self):
        """Get a connection from the pool"""
        try:
            return self._pool.get_connection()
        except Exception as e:
            raise Exception(f"Error getting connection from pool: {str(e)}")

    def execute_query(self, query, params=None):
        """Execute a query and return results"""
        connection = None
        cursor = None
        try:
            connection = self.get_connection()
            cursor = connection.cursor(dictionary=True)

            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            if query.strip().upper().startswith('SELECT'):
                return cursor.fetchall()
            else:
                connection.commit()
                return cursor.rowcount

        except Exception as e:
            if connection:
                connection.rollback()
            raise Exception(f"Error executing query: {str(e)}")
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()