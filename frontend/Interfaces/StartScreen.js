import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';

const EmpecemosScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ImageBackground
                source={require('../assets/startImage.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
                blurRadius={3}
            >
                <View style={styles.overlay} />

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Empecemos</Text>
                    <Text style={styles.subtitle}>Adentrate a tus colores</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.buttonText}>Crear Cuenta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <Text style={styles.signInButtonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)', // Solid overlay instead of gradient
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    title: {
        fontSize: 48,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'left',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0',
        marginBottom: 40,
        textAlign: 'left',
    },
    buttonsContainer: {
        width: '100%',
    },
    signUpButton: {
        backgroundColor: '#65709F',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    signInButton: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    signInButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default EmpecemosScreen;