import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, SafeAreaView} from 'react-native';

function Container({ children }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            {children}
        </SafeAreaView>
    );
     
}

export default Container;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    
  },
});

