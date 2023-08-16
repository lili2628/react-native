import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, StyleSheet } from "react-native";

import { AntDesign, Feather } from '@expo/vector-icons';

import CreatePostsScreen from '../CreatePostsScreen';
import ProfileScreen from '../ProfileScreen';
import DefaultPostsScreen from "../DefaultPostsScreen";


const Tabs = createBottomTabNavigator();


const screenOptions = ({ navigation, route }) => ({
  headerLeft: () => (
    <Feather
      name="arrow-left"
      size={24}
      color={styles.headerTintColor}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerRight: () => (
        <Feather
          name="log-out"
                size={24}
                color={styles.exitBtn.color}
                onPress={() => navigation.navigate('Login')}
        />),
  tabBarIcon: ({ focused, color, size }) => {
    let tabBarItem;

    if (route.name === 'DefaultPostsScreen') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <AntDesign
            name="appstore-o"
            size={size}
            color={styles.tabItemActive.activeFill}
          />
        </View>
      ) : (
        <AntDesign
          name="appstore-o"
          size={size}
          color={styles.tabItemActive.inActiveFill}
        />
      );
    }

    if (route.name === 'Create') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <AntDesign
            name="plus"
            size={size}
            color={styles.tabItemActive.activeFill}
          />
        </View>
      ) : (
        <AntDesign
          name="plus"
          size={size}
          color={styles.tabItemActive.inActiveFill}
        />
      );
    }

    if (route.name === 'Profile') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <Feather
            name="user"
            size={size}
            color={styles.tabItemActive.activeFill}
          />
        </View>
      ) : (
        <Feather
          name="user"
          size={size}
          color={styles.tabItemActive.inActiveFill}
        />
      );
    }

    return tabBarItem;
  },
  ...styles,
  tabBarShowLabel: false,
});


const PostsScreen = () => {
  return (
    <Tabs.Navigator
      initialRouteName="DefaultPostsScreen"
      screenOptions={screenOptions}
    >
      <Tabs.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          title: 'Публікації',
        }}
      />

      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          tabBarStyle: { display: 'none' },
          headerRight: () => { },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
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
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: 'flex-end',
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  tabBarStyle: {
    paddingHorizontal: 73,
  },
  tabBarItemStyle: {
    paddingTop: 9,
    paddingBottom: 35,
    height: 85,
  },
  tabItemActive: {
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    activeFill: '#FFFFFF',
    inActiveFill: '#212121',
  },
  exitBtn: {
    color: '#BDBDBD',
  },
});

export default PostsScreen;