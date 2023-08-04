import React from 'react';
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
        options={{title: ''}}
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

export default PostsScreen;