import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import ProfileList from '../../components/ProfileList';
import Container from '../../components/Container';
import { authUpdateUser } from '../../redux/auth/uathOperations.js';
import { selectStateUserId, selectStateLogin, selectStateAvatar, selectorStateComment} from '../../redux/selectors.js';
import { myStorage, db } from '../../firebase/config.js';
import { authSignOutUser } from '../../redux/auth/uathOperations.js';


const ImageManipulator = async (oldUri, option = [], compressValue) => {
  try {
    const { uri } = await manipulateAsync(oldUri, option, {
      compress: compressValue,
      format: SaveFormat.JPEG,
    });
    return uri;
  } catch (error) {
    console.log(error.message);
  }
};


const ProfileScreen = ({ navigation, route }) => {
  const imageBg = require('../../images/bg-image.jpg');

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const userId = useSelector(selectStateUserId);
  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);
  const comment = useSelector(selectorStateComment);

  useEffect(() => {
    const dbRef = collection(db, 'posts');
    const myQuery = query(dbRef, where('owner.userId', '==', userId));

    onSnapshot(
      myQuery,
      querySnapshot => {
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const reversPosts = posts.reverse();

        setPosts(reversPosts);
      },
      () => { }
    );
  }, [userId, comment]);


  const pickImage = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!canceled) {
        const [{ uri }] = assets;

        const newUri = await ImageManipulator(
          uri,
          [
            {
              resize: { height: 240, width: 240 },
            },
          ],
          0.5
        );

        return newUri;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhotoToServer = async (photo) => {
    const postId = Date.now().toString();

    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const imageRef = ref(myStorage, `userAvatars/${postId}`);

      await uploadBytes(imageRef, file);

      return await getDownloadURL(imageRef);
    } catch (error) {
      alert('Photo Downloading is failed');
      console.log(error.message);
    }
  };

  const changeAvatar = async () => {
    const avatarUri = await pickImage();
    const avatarURL = await uploadPhotoToServer(avatarUri);

    if (avatarURL) {
      dispatch(authUpdateUser({ avatarURL }));

      alert('Вітаємо! Аватар змінено');
    };
  };

  return (
    <Container>
      <ImageBackground source={imageBg} style={styles.imageBg}>
        <View style={styles.container}>
          <View style={styles.myPostsContainer}>
            
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrp}>
                  <Image source={{ uri: avatar }} style={styles.avatarImg} />
              </View>

              <TouchableOpacity style={styles.buttonAvatar} onPress={changeAvatar}>
                <Text style={styles.buttonAvatarText}>{'+'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.exitBtn}>
              <Feather
                name="log-out"
                size={24}
                color={styles.exitBtn.color}
                onPress={() => {
                  navigation.navigate('Login');
                  dispatch(authSignOutUser())
                }}
              />
            </View>

            <Text style={styles.login}>{login}</Text>
            <Text style={styles.count}>Всього публікацій: {posts.length}</Text>
            
            <ProfileList posts={posts} navigation={navigation} route={route} />
            
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
};


const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: hp('20%'),
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  myPostsContainer: {
    paddingTop: hp('7%'),
    minHeight: hp('50%'),
  },
  avatarContainer: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  avatarWrp: {
    borderRadius: 16,
    overflow: 'hidden',
    height: hp('14%'),
    width: hp('14%'),
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  buttonAvatar: {
    position: 'absolute',
    bottom: 13,
    right: -13,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#ffffff',
  },
  buttonAvatarText: {
    color: '#FF6C00',
  },
  exitBtn: {
    position: 'absolute',
    right: 0,
    top: 16,
    color: '#BDBDBD',
  },
  login: {
    marginBottom: 5,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    fontWeight: '500',
  },
  count:{ 
    alignSelf: 'flex-end',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginBottom: 3,
    color: '#BDBDBD',
  },
});


export default ProfileScreen;