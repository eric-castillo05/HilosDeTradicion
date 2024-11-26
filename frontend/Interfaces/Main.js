import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Home, ShoppingCart, Tag, User } from 'lucide-react-native';

export default function Main({ navigation }) {
    // Array con las imágenes y datos de los productos
    const products = [
        { id: '1', image: require('../assets/vestido.jpg'), name: 'Vestido flor otoñal', price: '$49.99' },
        { id: '2', image: require('../assets/guayabera.png'), name: 'Vestido de noche', price: '$79.99' },
        { id: '3', image: require('../assets/vestblanco.png'), name: 'Vestido casual', price: '$39.99' },
        { id: '4', image: require('../assets/guayablanca.png'), name: 'Vestido elegante', price: '$89.99' },
    ];

    const [activeTab, setActiveTab] = React.useState('home');

    // Componente de la barra de navegación
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
                    {products.map((product, index) => (
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

                <Text style={styles.sectionTitle}>También te podría interesar...</Text>
                <View style={styles.gridContainer}>
                    {['9539468f-0598-4adc-9338-d8b25a6304a8', '9d3e5ee9-3e79-408c-a945-5593b631d0dc', '862d4a78-3605-4376-afb9-a806eea42378', '7f31cf0b-d2c1-446f-b8a3-cf7f768d36f5'].map((img, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.productCard}
                            activeOpacity={0.7}
                        >
                            <ImageBackground
                                source={{ uri: `https://cdn.usegalileo.ai/stability/${img}.png` }}
                                style={styles.productImage}
                                imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            />
                            <Text style={styles.productName}>Lorem Ipsum</Text>
                            <Text style={styles.productPrice}>Price</Text>
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
    container: { paddingBottom: 80, backgroundColor: '#FFFFFF' }, // Increased bottom padding for navigation bar
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
        elevation: 2,  // for Android shadow
        shadowColor: '#000',  // for iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    productImage: { width: '100%', aspectRatio: 3 / 4 },
    productName: { color: '#1C160C', fontSize: 14, fontWeight: '500', paddingHorizontal: 10, paddingTop: 8 },
    productPrice: { color: '#A18249', fontSize: 14, paddingHorizontal: 10, paddingBottom: 8 },

    // New Navigation Bar Styles
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
