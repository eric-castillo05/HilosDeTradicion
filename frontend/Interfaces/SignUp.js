import React from 'react';
import { View, Text, StyleSheet, Keyboard, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Alert , ImageBackground} from 'react-native';
import { useState } from 'react';
import {Ionicons} from "@expo/vector-icons";

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend
    const [Name, setName] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend
    const [LName, setLName] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend
    const [password, setPassword] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend
    const [confirmPassword, setConfirmPassword] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
        const registrationData = {
            email,
            Name,
            LName,
            password
        };
        try {
            const response = await fetch('http://backend_aldo_y_eric/registro', { // Cambiar por la URL abckend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 201) {
                Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente');
                navigation.navigate('SignIn');
            } else {
                const errorData = await response.json();
                Alert.alert('Error en el registro', errorData.message || 'Hubo un problema con tu registro');
            }
        } catch (error) {
            Alert.alert('Error', 'Error en la conexión al servidor');
        }
    };
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../assets/signupback.png')}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                        blurRadius={5}
                    >
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="black"
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />
                    <StatusBar barStyle="dark-content" />
                    <Text style={styles.title}>Sign Up</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#8c8c8c"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#8c8c8c"
                            value={Name}
                            onChangeText={setName}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido"
                            placeholderTextColor="#8c8c8c"
                            value={LName}
                            onChangeText={setLName}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#8c8c8c"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>


                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#8c8c8c"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>SIGN-UP</Text>
                    </TouchableOpacity>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    backIcon: {
        position: 'absolute',
        top: 90,
        left: 20,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 100,
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#65709F',
        borderRadius: 45,
        paddingHorizontal: 50,
        marginBottom: 30,
        shadowColor: '#ffffff',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 1,
        elevation: 3,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#ffffff',
    },
    button: {
        width: '30%',
        height: 60,
        backgroundColor: '#65709F',
        borderRadius: 65,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 150,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default SignUp;

