import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./Interfaces/StartScreen";
import SignIn from "./Interfaces/SignIn";
import SignUp from "./Interfaces/SignUp";
import Main from "./Interfaces/Main";
import Perfil from "./Interfaces/Perfil";
import Carrito from "./Interfaces/Carrito";
import DetalleVestido from "./Interfaces/Detallevestido";
import ArtesanoScreen from "./Interfaces/ArtesanoScreen";
import ProductoScreen from "./Interfaces/ProductoScreen";
import EditarPerfil from "./Interfaces/EditarPerfil";
import ArtesanoSignUp from "./Interfaces/ArtesanoSignUp";
import MainArtesano from "./Interfaces/MainArtesano";
import { CartProvider } from "./CartContext";

const Stack = createStackNavigator();

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Start"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Start" component={StartScreen} />
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Detallevestido" component={DetalleVestido} />
                    <Stack.Screen name="Perfil" component={Perfil} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Carrito" component={Carrito} />
                    <Stack.Screen name="Artesano" component={ArtesanoScreen} />
                    <Stack.Screen name="Productos" component={ProductoScreen} />
                    <Stack.Screen name="Editar" component={EditarPerfil} />
                    <Stack.Screen name="Artesanosign" component={ArtesanoSignUp} />
                    <Stack.Screen name="MainArtesano" component={MainArtesano} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}