import 'react-native-gesture-handler';

import React from "react";
import { Provider } from 'react-redux';


import { useFonts } from 'expo-font';

import { store } from './redux/store'; 

import Main from './components/Main/Main';



const App = () => {

   const [fontsLoaded] = useFonts({
     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
     'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
   });
  
  if (!fontsLoaded) {
    return null;
  };


 
  return (
    <Provider store={store}>
     <Main/>
    </Provider>
  );
};

export default App;
