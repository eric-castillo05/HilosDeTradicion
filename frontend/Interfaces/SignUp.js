import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    TextInput,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
    Alert,
    ImageBackground,
    ActivityIndicator  // <-- Asegúrate de que esté aquí
} from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        // Validación básica de campos
        if (!email || !name || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        setLoading(true); // Mostrar el indicador de carga

        try {
            const response = await axios.post('http://192.168.0.101:5000/compradores/signup', {
                nombre: name,
                email: email,
                password: password,
            });

            if (response.status === 201) {
                Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente', [
                    { text: 'OK', onPress: () => navigation.navigate('SignIn') },
                ]);
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert('Error', error.response.data.error || 'Campos requeridos faltantes');
                } else {
                    Alert.alert('Error', 'Hubo un problema con tu registro. Intenta nuevamente.');
                }
            } else {
                Alert.alert('Error', 'No se pudo conectar con el servidor');
            }
        } finally {
            setLoading(false); // Ocultar el indicador de carga
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/signupback.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                    blurRadius={2}
                >
                    <View style={styles.overlay} />

                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>

                    <StatusBar barStyle="light-content" />

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Crear Cuenta</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color="white"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={24}
                                color="white"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={24}
                                color="white"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.showPasswordIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.signUpButtonText}>REGISTRARSE</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.signInContainer}>
                            <Text style={styles.signInText}>
                                ¿Ya tienes una cuenta?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <Text style={styles.signInLinkText}>Iniciar Sesión</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: 'white',
        fontSize: 16,
    },
    showPasswordIcon: {
        padding: 10,
    },
    signUpButton: {
        backgroundColor: '#65709F',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

export default SignUp;
