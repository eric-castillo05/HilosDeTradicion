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
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
        // Reset error states
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        // Validaciones
        if (!email || !name || !lastName || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Formato de correo inválido');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true); // Show loading spinner

        const registrationData = { email, name, lastName, password };

        try {
            const response = await fetch('http://backend_misa_y_eric/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 201) {
                Alert.alert(
                    'Registro exitoso',
                    'Tu cuenta ha sido creada correctamente',
                    [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
                );
                // Clear form after successful registration
                setEmail('');
                setName('');
                setLastName('');
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                Alert.alert('Error en el registro', errorData.message || 'Hubo un problema con tu registro');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        } finally {
            setLoading(false); // Hide loading spinner
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

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Crear Cuenta</Text>

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
                            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
                                    name="person-outline"
                                    size={24}
                                    color="white"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Apellido"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={lastName}
                                    onChangeText={setLastName}
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
                            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={24}
                                    color="white"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmar Contraseña"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.showPasswordIcon}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

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
                    </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'left',
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