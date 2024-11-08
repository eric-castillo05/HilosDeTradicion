import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Perfil() {
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
                    <Text style={styles.profileName}>Eric Villa Martinez</Text>
                    <Text style={styles.profileEmail}>Holamundo@gmail.com</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton}>
                            <Text style={styles.buttonText}>Log Out</Text>
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
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F4F9',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileEmail: {
        fontSize: 14,
        color: '#aa419e',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    editButton: {
        backgroundColor: '#cfc7cd',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    logoutButton: {
        backgroundColor: '#df42ce',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    optionContainer: {
        borderTopWidth: 1,
        borderTopColor: '#E8E1E9',
        marginTop: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E1E9',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
    arrow: {
        fontSize: 16,
        color: '#A18249',
    },
});
