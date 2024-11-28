import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Editar({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const email = await AsyncStorage.getItem('userEmail');

                if (name) setUserName(name);
                if (email) setUserEmail(email);
            } catch (error) {
                console.log('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const userId = await AsyncStorage.getItem('userUID');
            if (!userId) {
                Alert.alert('Error', 'No se encontró el ID de usuario');
                return;
            }

            const response = await axios.put(`http://192.168.0.101:5000/compradores/${userId}`, {
                nombre: userName,
                email: userEmail
            });

            if (response.status === 200) {
                await AsyncStorage.setItem('userName', userName);
                await AsyncStorage.setItem('userEmail', userEmail);
                Alert.alert('Éxito', 'Perfil actualizado correctamente');
                navigation.goBack();
            }
        } catch (error) {
            console.log('Error completo:', error.response ? error.response.data : error);
            Alert.alert('Error', error.response?.data?.error || 'No se pudo actualizar el perfil');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>

            <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Nombre"
            />

            <TextInput
                style={styles.input}
                value={userEmail}
                onChangeText={setUserEmail}
                placeholder="Correo electrónico"
                keyboardType="email-address"
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
            >
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 60,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#E0E0E2',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#5E3D7E',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});