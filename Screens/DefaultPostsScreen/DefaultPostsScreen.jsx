import React from "react";
import { View, FlatList, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import Post from '../../components/Post';
import { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';



const DefaultPostsScreen = ({ navigation, route }) =>  {
  
  const [posts, setPosts] = useState([]);

 
  useEffect(() => {
    if (route.params) {
      console.log(route.params);
    
      setPosts(prevState => [...prevState, route.params.state]);
      console.log(posts);
    };
  }, [route.params]);

  useEffect(() => {
  navigation.setOptions({
      title: 'Публікації',
      headerRight: () => (
        <Feather
          name="log-out"
          size={24}
          color={styles.exitBtn.color}
          style={styles.exitBtn}
          onPress={() => navigation.navigate('Login')}
        />),  
      headerLeft: () => { },
  });
}, [navigation]);

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