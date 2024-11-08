import React from 'react';
import { View, Text, StyleSheet, Keyboard, TextInput, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import { useState } from 'react';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend
    const [password, setPassword] = useState(''); // Cambiar por el nombre de la variable que se usará en el backend

    const handleSignIn = async () => {
        try {
            let response = await axios.post('http://', {
                email: email,  // Cambiar por el nombre de la variable que se usará en el backend
                password: password, // Cambiar por el nombre de la variable que se usará en el backend
            });
            if (response.status === 200) {
                Alert.alert('Login exitoso');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Main'}],
                    })
                );
                return;
            }
        } catch (error) {
            if (error.response.status === 401) {
                Alert.alert('Email o contraseña incorrectos');
            } else {
                Alert.alert('Error inesperado');
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/signinback.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                    blurRadius={1}
                >

                <Ionicons
                    name="arrow-back"
                    size={30}
                    color="black"
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}
                />
                <StatusBar barStyle="dark-content" />
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>👤</Text>
                </View>
                    <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.subtitles}> Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignIn} // Cambiar por el nombre de la función
                >
                    <Text style={styles.buttonText}>SIGN-IN</Text>
                </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.text}> Aún no tienes cuenta?</Text>
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
        marginBottom: 50,
        textAlign: 'center',
    },
    subtitles: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 50,
        textAlign: 'right',
        marginRight: 20,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 50,
        textAlign: 'center',
    },
    iconContainer: {
        backgroundColor: '#EDAAC1',
        borderRadius: 50,
        padding: 20,
        marginBottom: 50,
        alignSelf: 'center',
    },
    icon: {
        fontSize: 50,
        color: '#333',
        alignSelf: 'center',
    },
    input: {
        width: '80%',
        height: 60,
        borderRadius: 25,
        backgroundColor: '#EDAAC1',
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 40,
        shadowColor: '#ffffff',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 9,
        elevation: 3,
        alignSelf: 'center',
    },
    button: {
        width: '60%',
        height: 60,
        backgroundColor: '#EDAAC1',
        borderRadius: 65,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default SignIn;
