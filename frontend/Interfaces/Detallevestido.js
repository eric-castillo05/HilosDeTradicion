import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../CartContext';

export default function DetalleVestido({ route }) {
    const { product } = route.params;  // Obtener datos del producto
    const navigation = useNavigation();
    const { setCarrito } = useContext(CartContext);

    const agregarAlCarrito = () => {
        setCarrito((prevCarrito) => {
            // Verificar si el producto ya existe en el carrito
            const existe = prevCarrito.some((item) => item.id === product.id);
            if (existe) {
                Alert.alert('Producto ya en el carrito', 'Este producto ya ha sido agregado.');
                return prevCarrito;
            }
            return [...prevCarrito, { ...product, cantidad: 1 }];
        });
        Alert.alert('Producto agregado', `${product.name} ha sido agregado al carrito.`);
        navigation.goBack(); // Volver a la pantalla anterior
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} resizeMode="contain" />
            </View>

            <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={agregarAlCarrito}
            >
                <Text style={styles.addToCartText}>Agregar al carrito</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },
    productImageContainer: { alignItems: 'center', marginTop: 20 },
    productImage: { marginTop: 50 ,width: '30%', height: 300, borderRadius: 10 },
    productDetails: { paddingHorizontal: 16, paddingTop: 20 },
    productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    productPrice: { fontSize: 18, color: '#A18249', marginBottom: 16 },
    productDescription: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 30 },
    addToCartButton: { backgroundColor: '#df42ce', paddingVertical: 14, borderRadius: 10, marginHorizontal: 16, marginBottom: 16, alignItems: 'center' },
    addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    backButton: { paddingVertical: 14, borderWidth: 1, borderColor: '#df42ce', borderRadius: 10, marginHorizontal: 16, alignItems: 'center' },
    backButtonText: { color: '#df42ce', fontSize: 16, fontWeight: 'bold' },
});