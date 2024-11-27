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
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
            return;
        }

        setLoading(true); // Mostrar el indicador de carga

        try {
            const response = await axios.post('http://192.168.0.101:5000/compradores/signin', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                // Si el inicio de sesión es exitoso, guardamos los datos del usuario en AsyncStorage
                const { nombre, email } = response.data.comprador; // Suponemos que el backend retorna estos datos
                await AsyncStorage.setItem('userName', nombre);
                await AsyncStorage.setItem('userEmail', email);

                // Redirigimos a la pantalla principal
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    })
                );
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        Alert.alert('Error', 'Email o contraseña incorrectos');
                        break;
                    case 404:
                        Alert.alert('Error', 'Usuario no encontrado');
                        break;
                    default:
                        Alert.alert('Error', 'Ha ocurrido un error inesperado');
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
                    source={require('../assets/signinback.png')}
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
                        <Text style={styles.title}>Iniciar Sesión</Text>

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
                            style={styles.forgotPasswordLink}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.forgotPasswordText}>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={handleSignIn}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.signInButtonText}>INICIAR SESIÓN</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>
                                ¿No tienes una cuenta?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.signUpLinkText}>Regístrate</Text>
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
    forgotPasswordLink: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: 'white',
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#65709F',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
        fontSize: 14,
    },
    signUpLinkText: {
        color: '#65709F',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default SignIn;
