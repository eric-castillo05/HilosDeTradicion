import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

export default function Main() {
    // Array con las imágenes y datos de los productos
    const products = [
        { id: '1', image: require('../assets/vestido.jpg'), name: 'Vestido flor otoñal', price: 'Precio' },
        { id: '2', image: require('../assets/guayabera.png'), name: 'Vestido de noche', price: 'Precio' },
        { id: '3', image: require('../assets/vestblanco.png'), name: 'Vestido casual', price: 'Precio' },
        { id: '4', image: require('../assets/guayablanca.png'), name: 'Vestido elegante', price: 'Precio' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>LA LARGA ESPERA TERMINÓ</Text>
                </View>

                <ImageBackground
                    source={{ uri: "https://cdn.usegalileo.ai/sdxl10/23e80d06-d9e5-426d-9671-8ab29a3f6114.png" }}
                    style={styles.collectionBackground}
                >
                    <Text style={styles.collectionText}>Nueva Colección</Text>
                </ImageBackground>

                <Text style={styles.sectionTitle}>Lo más vendido</Text>
                <View style={styles.gridContainer}>
                    {products.map((product, index) => (
                        <View key={index} style={styles.productCard}>
                            <ImageBackground
                                source={product.image}
                                style={styles.productImage}
                            />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.storyContainer}>
                    <View style={styles.storyTextContainer}>
                        <Text style={styles.storyTitle}>HAZ CLICK Y CONOCE LA HISTORIA DE NUESTRAS PRENDAS Y SU ELABORACIÓN</Text>
                        <Text style={styles.storySubtitle}>DESCUBRELO AQUÍ</Text>
                    </View>
                    <TouchableOpacity style={styles.storyButton} onPress={() => {/* función para navegar a la historia */}}>
                        <Text style={styles.storyButtonText}>Ver Historia</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>También te podría interesar...</Text>
                <View style={styles.gridContainer}>
                    {['9539468f-0598-4adc-9338-d8b25a6304a8', '9d3e5ee9-3e79-408c-a945-5593b631d0dc', '862d4a78-3605-4376-afb9-a806eea42378', '7f31cf0b-d2c1-446f-b8a3-cf7f768d36f5'].map((img, index) => (
                        <View key={index} style={styles.productCard}>
                            <ImageBackground
                                source={{ uri: `https://cdn.usegalileo.ai/stability/${img}.png` }}
                                style={styles.productImage}
                            />
                            <Text style={styles.productName}>Lorem Ipsum</Text>
                            <Text style={styles.productPrice}>Price</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { paddingBottom: 20, backgroundColor: '#FFFFFF' },
    header: { paddingVertical: 20, alignItems: 'center' },
    title: { color: '#1C160C', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    collectionBackground: { height: 200, justifyContent: 'flex-end', padding: 16 },
    collectionText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { color: '#1C160C', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 10 },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 },
    productCard: { width: (width - 48) / 2, marginBottom: 16, borderRadius: 10, overflow: 'hidden', backgroundColor: '#F8F8F8' },
    productImage: { width: '100%', aspectRatio: 3 / 4 },
    productName: { color: '#1C160C', fontSize: 14, fontWeight: '500', paddingHorizontal: 10, paddingTop: 8 },
    productPrice: { color: '#A18249', fontSize: 14, paddingHorizontal: 10, paddingBottom: 8 },
    storyContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, padding: 16, borderRadius: 10, backgroundColor: '#FFFFFF', borderColor: '#E9DFCE', borderWidth: 1 },
    storyTextContainer: { flex: 1, paddingRight: 10 },
    storyTitle: { color: '#1C160C', fontSize: 16, fontWeight: 'bold' },
    storySubtitle: { color: '#A18249', fontSize: 14, marginTop: 4 },
    storyButton: { backgroundColor: '#df42ce', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
    storyButtonText: { color: '#FFFFFF', fontSize: 14, textAlign: 'center' },
});
