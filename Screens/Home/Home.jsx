import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import  CommentsScreen from '../CommentsScreen';
import MapScreen from '../MapScreen';
import PostsScreen from '../PostsScreen/PostsScreen';
import RegistrationScreen from '../RegistrationScreen/RegistrationScreen';
import LoginScreen from '../LoginScreen/LoginScreen';

const MainStack = createStackNavigator();


const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
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
    );
  };

  return (
    <MainStack.Navigator initialRouteName="PostsScreen">
      <MainStack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen} 
        options={{title: ''}}
      />
    <MainStack.Screen
        name="Comments"
        component={CommentsScreen} 
        options={{title: ''}}
    />
    </MainStack.Navigator>
  );
};


export default useRoute;