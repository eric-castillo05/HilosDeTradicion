import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalleVestido() {
    const vestido = {
        id: '1',
        nombre: 'Vestido Floral',
        precio: 1298,
        image: require('../assets/vestblanco.png'),
        tallas: ['XS', 'S', 'M', 'L', 'XL'],
        productosSugeridos: [
            {
                id: '2',
                nombre: 'Vestido Rojo',
                imagen: 'https://via.placeholder.com/150',
            },
            {
                id: '3',
                nombre: 'Vestido Azul',
                imagen: 'https://via.placeholder.com/150',
            },
        ],
    };

    const [cantidad, setCantidad] = useState(1);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);

    const incrementarCantidad = () => setCantidad(cantidad + 1);
    const decrementarCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

    const agregarAlCarrito = () => {
        if (!tallaSeleccionada) {
            Alert.alert('Selecciona una talla', 'Por favor, elige una talla antes de agregar al carrito.');
            return;
        }
        console.log('Producto agregado:', {
            id: vestido.id,
            nombre: vestido.nombre,
            precio: vestido.precio,
            talla: tallaSeleccionada,
            cantidad,
        });
        Alert.alert('Producto agregado', `El vestido ha sido agregado al carrito.\nTalla: ${tallaSeleccionada}\nCantidad: ${cantidad}`);
    };

    const renderProductoSugerido = ({ item }) => (
        <View style={styles.productoSugerido}>
            <Image source={{ uri: item.imagen }} style={styles.imagenSugerida} />
            <Text style={styles.nombreSugerido}>{item.nombre}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Image source={vestido.image} style={styles.imagen} />
            <Text style={styles.titulo}>{vestido.nombre}</Text>
            <Text style={styles.precio}>${vestido.precio}</Text>

            <View style={styles.tallas}>
                {vestido.tallas.map((talla, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tallaButton,
                            talla === tallaSeleccionada && styles.tallaSeleccionada,
                        ]}
                        onPress={() => setTallaSeleccionada(talla)}
                    >
                        <Text>{talla}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sugerenciasTitulo}>También te podría gustar</Text>
            <FlatList
                data={vestido.productosSugeridos}
                renderItem={renderProductoSugerido}
                keyExtractor={(item) => item.id}
                horizontal
            />

            <View style={styles.cantidadContainer}>
                <TouchableOpacity onPress={decrementarCantidad}>
                    <Text style={styles.boton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cantidad}>{cantidad}</Text>
                <TouchableOpacity onPress={incrementarCantidad}>
                    <Text style={styles.boton}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.botones}>
                <TouchableOpacity style={styles.botonCarrito} onPress={agregarAlCarrito}>
                    <Text style={styles.textoBoton}>Agregar al carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonComprar}>
                    <Text style={styles.textoBoton}>Comprar ahora</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    imagen: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    precio: {
        fontSize: 18,
        marginVertical: 10,
    },
    tallas: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    tallaButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    tallaSeleccionada: {
        borderColor: '#f01a7d',
        backgroundColor: '#ffeef4',
    },
    sugerenciasTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    productoSugerido: {
        marginRight: 15,
        alignItems: 'center',
    },
    imagenSugerida: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    nombreSugerido: {
        fontSize: 14,
        textAlign: 'center',
    },
    cantidadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    boton: {
        fontSize: 24,
        color: '#f01a7d',
        paddingHorizontal: 20,
    },
    cantidad: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    botonCarrito: {
        flex: 1,
        backgroundColor: '#f01a7d',
        padding: 15,
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonComprar: {
        flex: 1,
        backgroundColor: '#ffd700',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
