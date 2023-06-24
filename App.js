import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet,  SafeAreaView, Button } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import Home from './Screens/Home';
import RegistrationScreen from './Screens/RegistrationScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';




const MainStack = createStackNavigator();


export default function App() {

   const [fontsLoaded] = useFonts({
     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
     'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen} 
          options={{
          headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        /> 
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

