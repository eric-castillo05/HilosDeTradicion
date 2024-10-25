import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const EmpecemosScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/starback.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
                blurRadius={5}
            >

            <Text style={styles.title}>Empecemos</Text>
            <Text style={styles.subtitle}>Empieza por hacer Sign-In o Sign-Up</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.buttonText}>SIGN-UP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonText}>SIGN-IN</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backIcon: {
        position: 'absolute',
        top: 90,
        left: 20,
    },
    title: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        marginLeft: 20,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: '#65709F',
        marginBottom: 470,
        marginLeft: 20,
        textAlign: 'left',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonsContainer: {
        paddingBottom: 50,
    },
    button: {
        backgroundColor: '#65709F',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10, // Ajuste para los márgenes entre los botones
        width: '80%',
        alignSelf: 'center',
    },
    signInButton: {
        backgroundColor: '#65709F',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EmpecemosScreen;
