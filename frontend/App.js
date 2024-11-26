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

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen name={"Main"} component={Main}/>
                <Stack.Screen name={"Detallevestido"} component={DetalleVestido} />
                <Stack.Screen name={"Perfil"} component={Perfil} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name={"Carrito"} component={Carrito} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}
