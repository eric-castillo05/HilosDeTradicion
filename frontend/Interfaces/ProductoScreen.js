import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

const baseURL = 'http://10.177.28.20:5000/productos/';

export default function ProductoScreen({ navigation }) {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidadEnStock, setCantidadEnStock] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('1');
    const [imagen, setImagen] = useState(null);
    const [selectedProductoId, setSelectedProductoId] = useState(null);

    const fetchProductos = async () => {
        try {
            const response = await axios.get(baseURL);
            setProductos(response.data.productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            Alert.alert('Error', 'No se pudo obtener la lista de productos');
        }
    };

    const crearProducto = async () => {
        try {
            const newProducto = {
                nombre,
                descripcion,
                precio,
                categoria,
                cantidad_en_stock: cantidadEnStock,
                disponibilidad,
                imagen
            };

            const formData = new FormData();
            formData.append('nombre', newProducto.nombre);
            formData.append('descripcion', newProducto.descripcion);
            formData.append('precio', newProducto.precio);
            formData.append('categoria', newProducto.categoria);
            formData.append('cantidad_en_stock', newProducto.cantidad_en_stock);
            formData.append('disponibilidad', newProducto.disponibilidad);
            if (imagen) {
                formData.append('imagen', {
                    uri: imagen.uri,
                    type: imagen.type,
                    name: imagen.fileName,
                });
            }

            const response = await axios.post(baseURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                Alert.alert('Éxito', 'Producto creado correctamente');
                fetchProductos();
                limpiarFormulario();
            }
        } catch (error) {
            console.error('Error al crear producto:', error);
            Alert.alert('Error', 'No se pudo crear el producto');
        }
    };

    const actualizarProducto = async () => {
        if (!selectedProductoId) {
            Alert.alert('Error', 'Selecciona un producto para actualizar');
            return;
        }

        try {
            const updatedProducto = {
                nombre,
                descripcion,
                precio,
                categoria,
                cantidad_en_stock: cantidadEnStock,
                disponibilidad,
                imagen
            };

            const formData = new FormData();
            formData.append('nombre', updatedProducto.nombre);
            formData.append('descripcion', updatedProducto.descripcion);
            formData.append('precio', updatedProducto.precio);
            formData.append('categoria', updatedProducto.categoria);
            formData.append('cantidad_en_stock', updatedProducto.cantidad_en_stock);
            formData.append('disponibilidad', updatedProducto.disponibilidad);
            if (imagen) {
                formData.append('imagen', {
                    uri: imagen.uri,
                    type: imagen.type,
                    name: imagen.fileName,
                });
            }

            const response = await axios.put(`${baseURL}/${selectedProductoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                Alert.alert('Éxito', 'Producto actualizado correctamente');
                fetchProductos();
                limpiarFormulario();
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            Alert.alert('Error', 'No se pudo actualizar el producto');
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);

            if (response.status === 200) {
                Alert.alert('Éxito', 'Producto eliminado correctamente');
                fetchProductos();
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
        }
    };

    const seleccionarImagen = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.uri) {
                setImagen(response);
            }
        });
    };

    const limpiarFormulario = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCategoria('');
        setCantidadEnStock('');
        setDisponibilidad('1');
        setImagen(null);
        setSelectedProductoId(null);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const renderForm = () => (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
                {selectedProductoId ? 'Editar Producto' : 'Nuevo Producto'}
            </Text>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del producto"
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Describa el producto"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={3}
                />
            </View>

            <View style={styles.horizontalInputGroup}>
                <View style={styles.halfWidthInputContainer}>
                    <Text style={styles.inputLabel}>Precio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="$0.00"
                        keyboardType="numeric"
                        value={precio}
                        onChangeText={setPrecio}
                    />
                </View>
                <View style={styles.halfWidthInputContainer}>
                    <Text style={styles.inputLabel}>Categoría</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Categoría"
                        value={categoria}
                        onChangeText={setCategoria}
                    />
                </View>
            </View>

            <View style={styles.horizontalInputGroup}>
                <View style={styles.halfWidthInputContainer}>
                    <Text style={styles.inputLabel}>Stock</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={cantidadEnStock}
                        onChangeText={setCantidadEnStock}
                    />
                </View>
                <View style={styles.halfWidthInputContainer}>
                    <Text style={styles.inputLabel}>Disponibilidad</Text>
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                disponibilidad === '1' ? styles.toggleActive : styles.toggleInactive
                            ]}
                            onPress={() => setDisponibilidad('1')}
                        >
                            <Text style={styles.toggleText}>Disponible</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                disponibilidad === '0' ? styles.toggleActive : styles.toggleInactive
                            ]}
                            onPress={() => setDisponibilidad('0')}
                        >
                            <Text style={styles.toggleText}>No Disponible</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.imageUploadContainer}>
                <TouchableOpacity
                    style={styles.imageUploadButton}
                    onPress={seleccionarImagen}
                >
                    <Text style={styles.imageUploadButtonText}>
                        {imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                    </Text>
                </TouchableOpacity>
                {imagen && (
                    <Image
                        source={{ uri: imagen.uri }}
                        style={styles.uploadedImage}
                    />
                )}
            </View>

            <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={selectedProductoId ? actualizarProducto : crearProducto}
                >
                    <Text style={styles.primaryButtonText}>
                        {selectedProductoId ? 'Actualizar' : 'Crear'}
                    </Text>
                </TouchableOpacity>
                {selectedProductoId && (
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={limpiarFormulario}
                    >
                        <Text style={styles.secondaryButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.producto_id.toString()}
                ListHeaderComponent={renderForm}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        {item.url && (
                            <Image
                                source={{ uri: item.url }}
                                style={styles.productCardImage}
                            />
                        )}
                        <View style={styles.productCardContent}>
                            <Text style={styles.productName}>{item.nombre}</Text>
                            <Text style={styles.productCategory}>{item.categoria}</Text>
                            <Text style={styles.productDescription}>{item.descripcion}</Text>
                            <View style={styles.productDetailsContainer}>
                                <Text style={styles.productPrice}>${item.precio}</Text>
                                <Text style={[
                                    styles.productStatus,
                                    { color: item.disponibilidad ? '#28a745' : '#dc3545' }
                                ]}>
                                    {item.disponibilidad ? 'Disponible' : 'No disponible'}
                                </Text>
                            </View>
                            <View style={styles.cardActionButtons}>
                                <TouchableOpacity
                                    style={styles.cardEditButton}
                                    onPress={() => {
                                        setNombre(item.nombre);
                                        setDescripcion(item.descripcion);
                                        setPrecio(item.precio.toString());
                                        setCategoria(item.categoria);
                                        setCantidadEnStock(item.cantidad_en_stock.toString());
                                        setDisponibilidad(item.disponibilidad.toString());
                                        setSelectedProductoId(item.producto_id);
                                    }}
                                >
                                    <Text style={styles.cardActionButtonText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cardDeleteButton}
                                    onPress={() => eliminarProducto(item.producto_id)}
                                >
                                    <Text style={styles.cardActionButtonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.productListContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f6f9',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginVertical: 20,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#34495e',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    horizontalInputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    halfWidthInputContainer: {
        width: '48%',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    toggleActive: {
        backgroundColor: '#65709F',
    },
    toggleInactive: {
        backgroundColor: '#6c757d',
    },
    toggleText: {
        color: 'white',
        fontWeight: '600',
    },
    imageUploadContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    imageUploadButton: {
        backgroundColor: '#65709F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    imageUploadButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    uploadedImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginTop: 15,
    },
    actionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: '#65709F',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        flex: 1,
        marginRight: 10,
    },
    primaryButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        flex: 1,
    },
    secondaryButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    listTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    productListContainer: {
        paddingBottom: 20,
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
    productCardImage: {
        width: 120,
        height: 120,
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
    productDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    cardActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cardEditButton: {
        backgroundColor: '#65709F',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flex: 1,
        marginRight: 10,
    },
    cardDeleteButton: {
        backgroundColor: '#dc3545',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flex: 1,
    },
    cardActionButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});
