import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  CommentsScreen from '../CommentsScreen';
import MapScreen from '../MapScreen';
import PostsScreen from '../PostsScreen/PostsScreen';



const NestedScreen = createStackNavigator();

function Home  ({ navigation, route, options }) {
  return (
    <NestedScreen.Navigator initialRouteName="PostsScreen">
      <NestedScreen.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
       />
      <NestedScreen.Screen
       name="Map"
        component={MapScreen} 
        options={{title: ''}}
      />
     <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen} 
        options={{title: ''}}
    />
    </NestedScreen.Navigator>
  );
    
};



export default Home;