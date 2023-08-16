import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View, FlatList, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';

import { collection, onSnapshot } from 'firebase/firestore';

import Container from '../../components/Container';
import Post from '../../components/Post';
import { selectorStateComment } from '../../redux/selectors.js';
import { db } from '../../firebase/config.js';
import { authSignOutUser } from '../../redux/auth/uathOperations.js';


const DefaultPostsScreen = ({ navigation, route }) => {
  
  const dispatch = useDispatch();
  
  const [posts, setPosts] = useState([]);

  const comment = useSelector(selectorStateComment);

  useEffect(() => {
    const dbRef = collection(db, 'posts');

    onSnapshot(
      dbRef,
      data => {
        const posts = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const reversPosts = posts.reverse();

        setPosts(reversPosts);
      },
      () => { }
    );

    navigation.setOptions({
        title: 'Публікації',
        headerRight: () => (
          <Feather
            name="log-out"
            size={24}
            color={styles.exitBtn.color}
            style={styles.exitBtn}
            onPress={
              () => {
                navigation.navigate('Login'),
                dispatch(authSignOutUser())
              }
            }
          />),  
        headerLeft: () => { },
    });
}, [navigation, comment]);

  return (
    <>
        <Container>
          <View style={styles.avatarContainer}>
                  <View style={styles.avatarWrp}>
                  </View>
          </View>
          <View style={styles.containerList}>
            <FlatList  data={posts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => <Post post={item} navigation={navigation} />}
            />
          </View>
        </Container>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
  
  },
  containerList: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  exitBtn: {
    color: '#BDBDBD',
    marginRight: 16,
  },
  avatarContainer: {
    
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 16,
    
  },
  avatarWrp: {
    borderRadius: 16,
    overflow: 'hidden',
    height: hp('8%'),
    width: hp('8%'),
    backgroundColor: '#e4e4e4',
  },
});

export default DefaultPostsScreen;