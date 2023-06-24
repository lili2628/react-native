import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import PostList from '../../components/PostList';
import { StyleSheet } from 'react-native';

const PostStack = createStackNavigator();

const screenOptions = ({ navigation, route }) => ({
  ...styles,
  headerShown: false,
});

function PostsScreen  ({ navigation }) {
  return (
    <PostStack.Navigator screenOptions={screenOptions}>
      <PostStack.Screen
        name="Posts"
        component={PostList}
      />
    </PostStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: '#212121',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 17,
  },
  headerTitleContainerStyle: {
    justifyContent: 'flex-end',
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerRightContainerStyle: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
});

export default PostsScreen;