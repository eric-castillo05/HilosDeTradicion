import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const InsertProductScreen = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidadEnStock, setCantidadEnStock] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [imagen, setImagen] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagen(result.uri);
        }
    };

    const handleSubmit = async () => {
        if (!nombre || !descripcion || !precio || !categoria || !cantidadEnStock) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('cantidad_en_stock', cantidadEnStock);
        formData.append('disponibilidad', disponibilidad);
        if (imagen) {
            formData.append('imagen', {
                uri: imagen,
                name: 'product_image.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            const response = await fetch('http://your-api-url.com/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Producto insertado correctamente');
            } else {
                Alert.alert('Error', 'No se pudo insertar el producto');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al insertar el producto');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agregar Nuevo Producto</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre del Producto</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="shirt-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ingrese el nombre del producto"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción</Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="text-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={descripcion}
                        onChangeText={setDescripcion}
                        placeholder="Descripción del producto"
                        multiline
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.halfInputGroup}>
                    <Text style={styles.label}>Precio</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="cash-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={precio}
                            onChangeText={setPrecio}
                            keyboardType="numeric"
                            placeholder="$"
                        />
                    </View>
                </View>

                <View style={styles.halfInputGroup}>
                    <Text style={styles.label}>Categoría</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="albums-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={categoria}
                            onChangeText={setCategoria}
                            placeholder="Categoría"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.halfInputGroup}>
                    <Text style={styles.label}>Stock</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="layers-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={cantidadEnStock}
                            onChangeText={setCantidadEnStock}
                            keyboardType="numeric"
                            placeholder="Cantidad"
                        />
                    </View>
                </View>

                <View style={styles.halfInputGroup}>
                    <Text style={styles.label}>Disponibilidad</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#5E3D7E" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={disponibilidad}
                            onChangeText={setDisponibilidad}
                            placeholder="Ej: Disponible"
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Ionicons name="image-outline" size={24} color="white" />
                <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            {imagen && (
                <View style={styles.imagePreviewContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                    <Text style={styles.imagePreviewText}>Imagen seleccionada</Text>
                </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Insertar Producto</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C2C2E',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 60,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#5E3D7E',
        marginBottom: 8,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E2',
    },
    inputIcon: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#2C2C2E',
        paddingRight: 10,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfInputGroup: {
        width: '48%',
    },
    imagePickerButton: {
        backgroundColor: '#5E3D7E',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    imagePickerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    imagePreviewText: {
        color: 'green',
        marginLeft: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#5E3D7E',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InsertProductScreen;