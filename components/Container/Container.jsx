import React from "react";

import { StatusBar } from 'expo-status-bar';

import { StyleSheet, SafeAreaView} from 'react-native';

const Container = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    
  },
});

export default Container;