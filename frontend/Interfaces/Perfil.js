import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Perfil({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const getUserData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('userEmail');
            if (name) setUserName(name);
            if (email) setUserEmail(email);
        } catch (error) {
            console.log('Error al obtener los datos del usuario:', error);
        }
    };

    const handleSignOut = async () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userUID');
                            await AsyncStorage.removeItem('userName');
                            await AsyncStorage.removeItem('userEmail');
                            navigation.reset({ index: 0, routes: [{ name: 'Start' }] });
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo cerrar sesión');
                        }
                    },
                },
            ]
        );
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Eliminar cuenta',
            '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        try {
                            const userId = await AsyncStorage.getItem('userUID');
                            if (userId) {
                                const response = await axios.delete(`http://192.168.0.101:5000/compradores/${userId}`);
                                if (response.status === 200) {
                                    await AsyncStorage.removeItem('userUID');
                                    await AsyncStorage.removeItem('userName');
                                    await AsyncStorage.removeItem('userEmail');
                                    Alert.alert('Éxito', 'Tu cuenta ha sido eliminada');
                                    navigation.reset({ index: 0, routes: [{ name: 'Start' }] });
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
                    <Image source={require('../assets/perfil.jpeg')} style={styles.profileImage} />
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
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                        <Text style={styles.deleteButtonText}>Eliminar Cuenta</Text>
                    </TouchableOpacity>
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
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F7',
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
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
        backgroundColor: '#5E3D7E',
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
    deleteButton: {
        backgroundColor: '#dc3545',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 15,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});