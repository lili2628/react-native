import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet,  SafeAreaView } from 'react-native';
import  LoginScreen  from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    
  },
});



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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <LoginScreen />
      {/*<RegistrationScreen /> */}
    </SafeAreaView>
  );
};

