import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Carrito({ carrito, setCarrito }) {
    const incrementarCantidad = (id) => {
        setCarrito(carrito.map(item =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
    };

    const decrementarCantidad = (id) => {
        const producto = carrito.find(item => item.id === id);
        if (producto.cantidad === 1) {
            Alert.alert(
                'Eliminar producto',
                `¿Deseas eliminar "${producto.nombre}" del carrito?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Eliminar',
                        onPress: () => {
                            setCarrito(carrito.filter(item => item.id !== id));
                        },
                    },
                ],
            );
        } else {
            setCarrito(carrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ));
        }
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const finalizarPedido = () => {
        Alert.alert('Pedido finalizado', `Total a pagar: $${calcularTotal()}`);
        setCarrito([]); // Limpia el carrito después de finalizar
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.imagen} />
            <View style={styles.textContainer}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.precio}>Precio: ${item.precio}</Text>
            </View>
            <View style={styles.cantidadContainer}>
                <TouchableOpacity onPress={() => decrementarCantidad(item.id)}>
                    <Text style={styles.boton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cantidad}>{item.cantidad}</Text>
                <TouchableOpacity onPress={() => incrementarCantidad(item.id)}>
                    <Text style={styles.boton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Carrito</Text>
            {carrito.length > 0 ? (
                <>
                    <FlatList
                        data={carrito}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.totalContainer}>
                        <TouchableOpacity
                            style={[styles.finalizarBoton, carrito.length === 0 && styles.botonDesactivado]}
                            onPress={finalizarPedido}
                            disabled={carrito.length === 0}
                        >
                            <Text style={styles.finalizarTexto}>Finalizar pedido</Text>
                        </TouchableOpacity>
                        <Text style={styles.totalTexto}>Total: ${calcularTotal()}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.carritoVacio}>Tu carrito está vacío.</Text>
            )}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    imagen: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    nombre: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    precio: {
        fontSize: 14,
        color: '#888',
    },
    cantidadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boton: {
        fontSize: 20,
        color: '#f01a7d',
        paddingHorizontal: 10,
    },
    cantidad: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 20,
    },
    finalizarBoton: {
        backgroundColor: '#f01a7d',
        padding: 10,
        borderRadius: 10,
    },
    finalizarTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botonDesactivado: {
        backgroundColor: '#ccc',
    },
    totalTexto: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    carritoVacio: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});
