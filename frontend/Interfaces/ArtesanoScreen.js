import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet
} from 'react-native';
import axios from 'axios';

const baseURL = 'http://10.177.28.20:5000/artesanos';  // Cambia esta URL según tu configuración

const ArtesanosScreen = () => {
    const [artesanos, setArtesanos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [region, setRegion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedArtesanoId, setSelectedArtesanoId] = useState(null);

    // Función para obtener la lista de artesanos
    const fetchArtesanos = async () => {
        try {
            const response = await axios.get(baseURL);
            setArtesanos(response.data.artesanos);
        } catch (error) {
            console.error('Error al obtener los artesanos:', error);
            Alert.alert('Error', 'No se pudo obtener la lista de artesanos');
        }
    };

    // Función para crear un nuevo artesano
    const crearArtesano = async () => {
        try {
            const newArtesano = {
                nombre,
                region,
                descripcion
            };

            const response = await axios.post(baseURL, newArtesano);

            if (response.status === 201) {
                Alert.alert('Éxito', 'Artesano creado correctamente');
                fetchArtesanos(); // Refrescar la lista
                setNombre('');
                setRegion('');
                setDescripcion('');
            }
        } catch (error) {
            console.error('Error al crear el artesano:', error);
            Alert.alert('Error', 'No se pudo crear el artesano');
        }
    };

    // Función para actualizar un artesano
    const actualizarArtesano = async () => {
        if (!selectedArtesanoId) {
            Alert.alert('Error', 'Selecciona un artesano para actualizar');
            return;
        }

        try {
            const updatedArtesano = {
                nombre,
                region,
                descripcion
            };

            const response = await axios.put(`${baseURL}/${selectedArtesanoId}`, updatedArtesano);

            if (response.status === 200) {
                Alert.alert('Éxito', 'Artesano actualizado correctamente');
                fetchArtesanos(); // Refrescar la lista
                setNombre('');
                setRegion('');
                setDescripcion('');
                setSelectedArtesanoId(null);
            }
        } catch (error) {
            console.error('Error al actualizar el artesano:', error);
            Alert.alert('Error', 'No se pudo actualizar el artesano');
        }
    };

    // Función para eliminar un artesano
    const eliminarArtesano = async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);

            if (response.status === 200) {
                Alert.alert('Éxito', 'Artesano eliminado correctamente');
                fetchArtesanos(); // Refrescar la lista
            }
        } catch (error) {
            console.error('Error al eliminar el artesano:', error);
            Alert.alert('Error', 'No se pudo eliminar el artesano');
        }
    };

    // Cargar la lista de artesanos cuando el componente se monta
    useEffect(() => {
        fetchArtesanos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Artesanos</Text>

            {/* Formulario para crear o actualizar un artesano */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Región"
                value={region}
                onChangeText={setRegion}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
            />

            {/* Botón para crear o actualizar */}
            <TouchableOpacity style={styles.button} onPress={selectedArtesanoId ? actualizarArtesano : crearArtesano}>
                <Text style={styles.buttonText}>
                    {selectedArtesanoId ? 'Actualizar Artesano' : 'Crear Artesano'}
                </Text>
            </TouchableOpacity>

            {/* Lista de artesanos */}
            <FlatList
                data={artesanos}
                keyExtractor={(item) => item.artesano_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.artesanoItem}>
                        <Text>{item.nombre} ({item.region})</Text>
                        <Text>{item.descripcion}</Text>
                        <View style={styles.artesanoActions}>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
                                    setNombre(item.nombre);
                                    setRegion(item.region);
                                    setDescripcion(item.descripcion);
                                    setSelectedArtesanoId(item.artesano_id);
                                }}
                            >
                                <Text style={styles.actionButtonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => eliminarArtesano(item.artesano_id)}
                            >
                                <Text style={styles.actionButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#65709F',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    artesanoItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    artesanoActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#65709F',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
    },
});

export default ArtesanosScreen;
