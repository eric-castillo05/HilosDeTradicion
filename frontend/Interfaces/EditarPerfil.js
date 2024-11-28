import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker'; // Para seleccionar imagenes

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    // Obtener los datos del usuario almacenados en AsyncStorage
    const getUserData = async () => {
        try {
            const storedName = await AsyncStorage.getItem('userName');
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedImage = await AsyncStorage.getItem('userImage');
            const storedUserId = await AsyncStorage.getItem('userUID'); // Asegúrate de tener el ID del usuario guardado

            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
            if (storedImage) setImage(storedImage);
            if (storedUserId) setUserId(storedUserId);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    // Función para seleccionar una nueva imagen
    const selectImage = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.uri) {
                setImage(response.uri);
            }
        });
    };

    // Función para actualizar el perfil
    const handleSave = async () => {
        if (!name || !email) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('nombre', name);
            formData.append('email', email);

            // Si hay una imagen, la añadimos al formulario
            if (image) {
                formData.append('imagen', {
                    uri: image,
                    type: 'image/jpeg', // Ajusta el tipo según la imagen seleccionada
                    name: 'profile.jpg',
                });
            }

            const response = await axios.put(`http://10.177.28.20:5000/compradores/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                // Guardamos los datos actualizados en AsyncStorage
                await AsyncStorage.setItem('userName', name);
                await AsyncStorage.setItem('userEmail', email);
                if (image) await AsyncStorage.setItem('userImage', image);

                Alert.alert('Éxito', 'Perfil actualizado correctamente');
                navigation.goBack();  // Volver a la pantalla anterior
            }
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            Alert.alert('Error', 'No se pudo actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar la cuenta
    const handleDelete = async () => {
        Alert.alert(
            'Eliminar cuenta',
            '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`http://10.177.28.20:5000/compradores/${userId}`);

                            if (response.status === 200) {
                                // Limpiar los datos de AsyncStorage
                                await AsyncStorage.removeItem('userUID');
                                await AsyncStorage.removeItem('userName');
                                await AsyncStorage.removeItem('userEmail');
                                await AsyncStorage.removeItem('userImage');

                                Alert.alert('Éxito', 'Tu cuenta ha sido eliminada');
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Start' }],  // Redirigir al inicio
                                });
                            }
                        } catch (error) {
                            console.error('Error al eliminar la cuenta:', error);
                            Alert.alert('Error', 'No se pudo eliminar la cuenta');
                        }
                    },
                },
            ]
        );
    };

    // Llamar a getUserData cuando se monta el componente
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>

            <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.imageText}>Seleccionar Imagen</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Eliminar Cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
        paddingHorizontal: 25,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
        color: '#2C2C2E',
        marginTop: 20,
    },
    imagePicker: {
        alignSelf: 'center',
        marginBottom: 30,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#E9E9EB',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    imageText: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        height: 55,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#2C2C2E',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    saveButton: {
        backgroundColor: '#5E3D7E', // Deep purple
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#5E3D7E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FF3B30',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    deleteButtonText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen;
