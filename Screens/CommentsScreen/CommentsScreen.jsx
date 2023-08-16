import React from 'react';
import { useEffect, useState } from 'react';

import { View, Platform, KeyboardAvoidingView, StyleSheet, Image, Keyboard} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { Feather } from '@expo/vector-icons';

import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase/config.js';
import Comments from '../../components/Comments';
import CommentForm from '../../components/CommentForm';


const CommentsScreen = ({ navigation, route }) => {

  const { id: postId, photo } = route.params;

  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    

  useEffect(() => {
    const commentsRef = collection(db, 'posts', postId, 'comments');

    onSnapshot(
      commentsRef,
      data => {
        setAllComments(data.docs.map(comment => ({
          id: comment.id,
          ...comment.data(),
        })));
      },
      () => { }
    );

  navigation.setOptions({
    title: 'Коментарі',
      headerLeft: () => (
        <Feather
          name="arrow-left"
          size={24}
          color={styles.headerBackBtn}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),  
      headerRight: () => { },
  });
}, [navigation, postId]);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.keyboardWrp}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
           {allComments.length === 0 ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : 
              (
                <View>
                  <Comments allComments={allComments} photo={photo} />
                </View>
              )}

       
        <CommentForm
          postId={postId}
          isShowKeyboard={isShowKeyboard}
          setIsShowKeyboard={setIsShowKeyboard}
          hideKeyboard={hideKeyboard}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardWrp: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerBackBtn: '#212121',

  container_list: {
    gap: 32,
  },
  photo: {
    height: hp('28.8%'),
    marginBottom: hp('0.96%'),
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
});

export default CommentsScreen;