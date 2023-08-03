import React from "react";
import { View, FlatList, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import Post from '../../components/Post';
import { useState, useEffect } from 'react';
import {Feather } from '@expo/vector-icons';


const DefaultPostsScreen = ({ navigation, route }) =>  {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Feather
         name="log-out"
          size={24}
          color={styles.exitBtn.color}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params) {
      console.log(route.params);
    
      setPosts(prevState => [...prevState, route.params.state]);
      console.log(posts);
    };
  }, [route.params]);

  return (
    <Container>
      <View style={styles.containerList}>
         <FlatList  data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => <Post post={item} navigation={navigation} />}
        />
      </View>
    </Container>
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
  containerList: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  exitBtn: {
    color: '#BDBDBD',
  },
});

export default DefaultPostsScreen;