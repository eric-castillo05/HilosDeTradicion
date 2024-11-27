import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Home, ShoppingCart, Tag, User } from 'lucide-react-native';
import { productos, productosRelacionados } from './productos'; // Importa los productos desde el archivo productos.js

export default function Main({ navigation }) {
    const [activeTab, setActiveTab] = React.useState('home');

    const NavigationBar = () => (
        <View style={styles.navigationBar}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Main')}
            >
                <Home
                    color={activeTab === 'home' ? '#df42ce' : '#1C160C'}
                    size={24}
                />
                <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>
                    Inicio
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Carrito')}
            >
                <ShoppingCart
                    color={activeTab === 'carrito' ? '#df42ce' : '#1C160C'}
                    size={24}
                />
                <Text style={[styles.navText, activeTab === 'carrito' && styles.activeNavText]}>
                    Cesta
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Perfil')}
            >
                <User
                    color={activeTab === 'perfil' ? '#df42ce' : '#1C160C'}
                    size={24}
                />
                <Text style={[styles.navText, activeTab === 'perfil' && styles.activeNavText]}>
                    Cuenta
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>LA LARGA ESPERA TERMINÓ</Text>
                </View>

                <ImageBackground
                    source={{ uri: "https://cdn.usegalileo.ai/sdxl10/23e80d06-d9e5-426d-9671-8ab29a3f6114.png" }}
                    style={styles.collectionBackground}
                    imageStyle={{ borderRadius: 10 }}
                >
                    <Text style={styles.collectionText}>Nueva Colección</Text>
                </ImageBackground>

                <Text style={styles.sectionTitle}>Lo más vendido</Text>
                <View style={styles.gridContainer}>
                    {productos.map((product, index) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detallevestido', { product })}
                            key={index}
                            style={styles.productCard}
                            activeOpacity={0.7}
                        >
                            <ImageBackground
                                source={product.image}
                                style={styles.productImage}
                                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>También te podría interesar...</Text>
                <View style={styles.gridContainer}>
                    {productosRelacionados.map((product, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.productCard}
                            activeOpacity={0.7}
                        >
                            <ImageBackground
                                source={product.image}
                                style={styles.productImage}
                                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { paddingBottom: 80, backgroundColor: '#FFFFFF' },
    header: { paddingVertical: 20, alignItems: 'center' },
    title: { color: '#1C160C', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    collectionBackground: {
        height: 200,
        justifyContent: 'flex-end',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16
    },
    collectionText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { color: '#1C160C', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 10 },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    productCard: {
        width: (width - 48) / 2,
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F8F8F8',
        elevation: 2,
    },
    productImage: { width: '100%', aspectRatio: 3 / 4 },
    productName: { color: '#1C160C', fontSize: 14, fontWeight: '500', paddingHorizontal: 10, paddingTop: 8 },
    productPrice: { color: '#A18249', fontSize: 14, paddingHorizontal: 10, paddingBottom: 8 },
    navigationBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E9DFCE',
        paddingVertical: 10,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        marginTop: 4,
        fontSize: 12,
        color: '#1C160C'
    },
    activeNavText: {
        color: '#df42ce'
    }
});
