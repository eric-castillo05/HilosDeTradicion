import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.0.101:5000/productos/';

export default function MainArtesano() {
    const [productos, setProductos] = useState([]);
    const navigation = useNavigation();

    // Fetch products for the artisan
    const fetchProductos = async () => {
        try {
            const response = await axios.get(baseURL);
            setProductos(response.data.productos);
        } catch (error) {
            console.error('Error fetching products:', error);
            Alert.alert('Error', 'No se pudo obtener los productos');
        }
    };

    // Delete product
    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);
            if (response.status === 200) {
                Alert.alert('Éxito', 'Producto eliminado correctamente');
                fetchProductos(); // Refrescar la lista después de eliminar
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
        }
    };

    // Handle edit product
    const handleEditProducto = (item) => {
        // Navigate to ProductScreen for editing
        navigation.navigate('Producto', { productId: item.producto_id });
    };

    // Handle sign out
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

    useEffect(() => {
        fetchProductos();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
            <View style={styles.productCardContent}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productCategory}>{item.categoria}</Text>
                <Text style={styles.productDescription}>{item.descripcion}</Text>
                <Text style={styles.productPrice}>${item.precio}</Text>
                <Text style={[styles.productStatus, item.disponibilidad === '1' ? styles.available : styles.notAvailable]}>
                    {item.disponibilidad === '1' ? 'Disponible' : 'No disponible'}
                </Text>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditProducto(item)}
                >
                    <Ionicons name="pencil" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => eliminarProducto(item.producto_id)}
                >
                    <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Tus Productos</Text>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.producto_id.toString()}
                renderItem={renderItem}
                ListFooterComponent={
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Productos')}
                    >
                        <Text style={styles.addButtonText}>Agregar Nuevo Producto</Text>
                    </TouchableOpacity>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f9',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
    },
    signOutButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 8,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    productCardContent: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    productCategory: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#34495e',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2ecc71',
    },
    productStatus: {
        fontSize: 14,
        fontWeight: '600',
    },
    available: {
        color: '#28a745',
    },
    notAvailable: {
        color: '#dc3545',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    actionButton: {
        backgroundColor: '#65709F',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});