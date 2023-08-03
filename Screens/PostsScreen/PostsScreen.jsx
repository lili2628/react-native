import React from 'react';
//import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultPostsScreen from '../DefaultPostsScreen';
import  CommentsScreen from '../CommentsScreen';
import MapScreen from '../MapScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen} 
      />
      <NestedScreen.Screen
       name="Map"
        component={MapScreen} 
      />
     <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen} 
    />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;