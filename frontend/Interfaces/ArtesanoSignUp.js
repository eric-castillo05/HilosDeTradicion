import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// Cambia esta URL según tu configuración
const baseURL = 'http://192.168.0.101:5000/artesanos/';

const RegisterArtesanoScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [region, setRegion] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Función para crear un nuevo artesano
    const crearArtesano = async () => {
        if (!nombre || !region || !descripcion) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        try {
            const newArtesano = {
                nombre,
                region,
                descripcion
            };

            const response = await axios.post(baseURL, newArtesano);

            if (response.status === 201) {
                Alert.alert('Éxito', 'Artesano registrado correctamente');
                // Limpiar los campos después de registrar
                setNombre('');
                setRegion('');
                setDescripcion('');
            }
        } catch (error) {
            console.error('Error al crear el artesano:', error);
            Alert.alert('Error', 'No se pudo crear el artesano');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/signupback.png')} // Asegúrate de tener la imagen en el mismo directorio
                    style={styles.backgroundImage}
                    resizeMode="cover"
                    blurRadius={2}
                >
                    <View style={styles.overlay} />

                    <StatusBar barStyle="light-content" />

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Registrar Artesano</Text>

                        {/* Formulario para capturar la información del artesano */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Región"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={region}
                            onChangeText={setRegion}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descripción"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />

                        {/* Botón para crear un nuevo artesano */}
                        <TouchableOpacity style={styles.button} onPress={crearArtesano}>
                            <Text style={styles.buttonText}>Registrar Artesano</Text>
                        </TouchableOpacity>

                        {/* Volver a la pantalla de inicio de sesión si es necesario */}
                        <View style={styles.signInContainer}>
                            <Text style={styles.signInText}>¿Ya tienes cuenta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.signInLinkText}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparente para oscurecer el fondo
    },
    contentContainer: {
        paddingHorizontal: 30,
        width: '100%',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#65709F',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInText: {
        color: 'white',
        fontSize: 14,
    },
    signInLinkText: {
        color: '#65709F',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default RegisterArtesanoScreen;
