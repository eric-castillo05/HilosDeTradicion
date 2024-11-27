import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';  // Asegúrate de tener axios para hacer la solicitud al backend

export default function Perfil({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Obtener los datos del usuario del almacenamiento local
    const getUserData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');  // Suponemos que el nombre del usuario está guardado en AsyncStorage
            const email = await AsyncStorage.getItem('userEmail');  // Email también guardado
            if (name) {
                setUserName(name);
            }
            if (email) {
                setUserEmail(email);
            }
        } catch (error) {
            console.log('Error al obtener los datos del usuario:', error);
        }
    };

    // Función para cerrar sesión
    const handleSignOut = async () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userUID');
                            await AsyncStorage.removeItem('userName');
                            await AsyncStorage.removeItem('userEmail');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Start' }],  // Redirige al inicio
                            });
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo cerrar sesión');
                        }
                    },
                },
            ]
        );
    };

    // Función para eliminar la cuenta
    const handleDeleteAccount = async () => {
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
                            const userId = await AsyncStorage.getItem('userUID');
                            if (userId) {
                                // Realizamos la solicitud al backend para eliminar la cuenta
                                const response = await axios.delete(`http://10.177.28.20:5000/users/${userId}`);

                                if (response.status === 200) {
                                    // Eliminar los datos del usuario localmente
                                    await AsyncStorage.removeItem('userUID');
                                    await AsyncStorage.removeItem('userName');
                                    await AsyncStorage.removeItem('userEmail');

                                    Alert.alert('Éxito', 'Tu cuenta ha sido eliminada');
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Start' }],
                                    });
                                }
                            }
                        } catch (error) {
                            console.log('Error al eliminar la cuenta:', error);
                            Alert.alert('Error', 'No se pudo eliminar la cuenta');
                        }
                    },
                },
            ]
        );
    };

    // Obtener los datos del usuario al montar el componente
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Perfil</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/perfil.jpeg')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>{userName || 'Nombre no disponible'}</Text>
                    <Text style={styles.profileEmail}>{userEmail || 'Email no disponible'}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Editar')}>
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerItem} onPress={handleSignOut}>
                            <Ionicons name="log-out-outline" size={24} color="red" />
                            <Text style={[styles.buttonText, { color: 'red' }]}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Order History</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <Text style={styles.optionText}>Saved Items</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate ("Productos")}>
                        <Text style={styles.optionText}>Agregar Producto</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F7', // Softer background
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E2',
    },
    headerText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileImageOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C2C2E',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        width: '100%',
    },
    editButton: {
        backgroundColor: '#5E3D7E', // More sophisticated purple
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E2',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    optionContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F2',
    },
    optionText: {
        fontSize: 17,
        color: '#2C2C2E',
    },
    arrow: {
        fontSize: 20,
        color: '#A0A0A5',
    },
});