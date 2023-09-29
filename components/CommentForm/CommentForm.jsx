import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FontAwesome } from '@expo/vector-icons';

import { db } from '../../firebase/config.js';
import { selectStateLogin, selectStateAvatar } from '../../redux/selectors.js';
import { addComment } from '../../redux/post/postReducer.js';



const CommentForm = ({ postId, isShowKeyboard, setIsShowKeyboard, hideKeyboard }) => {

  const dispatch = useDispatch();

  const login = useSelector(selectStateLogin);
  const avatar = useSelector(selectStateAvatar);


  const [myComment, setMyComment] = useState('');
  const [isActiveInput, setIsActiveInput] = useState(false);

  const handleInputFocus = () => {
    setIsActiveInput(true);
  };

  const handleInputBlur = () => {
    setIsActiveInput(false);
  };

  const sendComment = async () => {
    const uniqueCommentId = Date.now().toString();
    try {
      const postRef = doc(db, 'posts', postId, 'comments', uniqueCommentId);

      await setDoc(postRef, {
        comment: myComment,
        owner:{
          login,
          avatar,
        },
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      setMyComment('');
      dispatch(addComment(myComment));
    } catch (error) {
      console.log(error);
    } finally {
      hideKeyboard();
    }
  };

  return (
    <View style={
        isShowKeyboard
          ? {
              ...styles.formWrp,
              paddingBottom: hp('12%'),
            }
          : styles.formWrp
    }>
      <TextInput
        style={{
          ...styles.input,
          borderBottomColor: isActiveInput ? '#FF6C00' : '#E8E8E8',
        }}
        value={myComment}
        onChangeText={value => setMyComment(value)}
        onFocus={() => {
          setIsShowKeyboard(true);
          handleInputFocus('comment');
        }}
        onBlur={() => {
          handleInputBlur('comment');
          hideKeyboard();
        }}
        inputMode="text"
        placeholder="Коментар..."
        multiline={true}
        maxLength={200}
        numberOfLines={5}
      />

      <TouchableOpacity style={
          !myComment
            ? styles.buttonForm
            : { ...styles.buttonForm, ...styles.activeButtonForm }
        }
        onPress={sendComment}
        disabled={!myComment}
      >
        <FontAwesome
          name="send"
          size={16}
          color={
            !myComment ? styles.buttonForm.fill : styles.activeButtonForm.fill
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  formWrp: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  input: {
    flex: 6,
    paddingTop: 4,
    paddingLeft: 20,
    paddingBottom: 4,
    alignItems: "center",
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#212121',
    backgroundColor: '#F6F6F6',
   
  },
  buttonForm: {
    borderColor: "#E8E8E8",
    border: 1,
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    fill: '#BDBDBD',
  },
  activeButtonForm: {
    backgroundColor: '#FF6C00',
    fill: '#fff',
    borderRadius: 100,
    height: 50,
  },
});


export default CommentForm;