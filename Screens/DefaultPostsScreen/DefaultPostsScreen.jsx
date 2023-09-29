import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View, FlatList, StyleSheet, Image, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';


import { collection, onSnapshot } from 'firebase/firestore';

import Container from '../../components/Container';
import Post from '../../components/Post';
import { selectorStateComment, selectStateAvatar, selectStateEmail, selectStateLogin} from '../../redux/selectors.js';
import { db } from '../../firebase/config.js';
import { authSignOutUser } from '../../redux/auth/uathOperations.js';


const DefaultPostsScreen = ({ navigation, route }) => {
  
  const dispatch = useDispatch();
  
  const [posts, setPosts] = useState([]);

  const avatar = useSelector(selectStateAvatar);
  const comment = useSelector(selectorStateComment);
  const name = useSelector(selectStateLogin);
  const email = useSelector(selectStateEmail);

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
        <Container style={styles.main}>
          <View style={styles.avatarContainer}>
            <View style={styles.container}>

              <View style={styles.avatarWrp}>
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
              </View>

            </View>  
          </View>

          <View style={styles.containerList}>
            <FlatList  data={posts}
            keyExtractor={({id}) => id}
                renderItem={({ item }) => <Post post={item} navigation={navigation} />}
            />
          </View>
        </Container>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
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
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  info:{
    marginLeft: 10,
  },
  avatarWrp: {
    borderRadius: 16,
    overflow: 'hidden',
    height: hp('8%'),
    width: hp('8%'),
    backgroundColor: '#e4e4e4',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    fontWeight: '700',
    color: "rgba(33, 33, 33, 1)",
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: '400',
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default DefaultPostsScreen;