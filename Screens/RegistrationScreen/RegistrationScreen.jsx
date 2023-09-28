import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { StyleSheet, Text, Image, View, TextInput, ImageBackground, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { myStorage } from '../../firebase/config.js';
import { authSignUpUser } from '../../redux/auth/uathOperations.js';
import Container from '../../components/Container';


const RegistrationScreen = () => {
  const imageBg = require('../../images/bg-image.jpg');
  
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyBoard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({
    login: false,
    email: false,
    password: false,
  });
  const initialState = {
    login: null,
    email: null,
    password: null,
    avatarUri: null,
  }
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setState] = useState({ ...initialState });


  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const validation = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          
    if (reg.test(email) === true) {
      return true;
    } else {
      alert('Please, enter email in valid form');
    }
  };

  const ImageManipulator = async (oldUri, option = [], compressValue) => {
    try {
      const { uri } = await manipulateAsync(oldUri, option, {
        compress: compressValue,
        format: SaveFormat.JPEG,
      });

      return uri;
    } catch (error) {
      console.log('Image Manipulator', error);
    }
  };

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
              resize: {
                height: 240,
                width: 240,
              },
            },
          ],
          0.5
        );

        setState(prev => ({
          ...prev,
          avatarUri: newUri,
        }));
      }
    } catch (error) {
      alert('Photo Picking is failed');
      console.log(error.message);
    }
  };
  
  const uploadPhotoToServer = async () => {
    const postId = Date.now().toString();

    try {
      const response = await fetch(state.avatarUri);
      const photo = await response.blob();
      const photoRef = ref(myStorage, `userAvatars/${postId}`);

      await uploadBytes(photoRef, photo);

      const link = await getDownloadURL(photoRef);

      return link;
    } catch (error) {
      alert('Photo Downloading is failed');
      console.log(error.message);
    }
  };

  const submit = async () => {
    hideKeyboard();

    const validEmail = validation(state.email);

    if (validEmail) {
      let photo;

      if (state.avatarUri) {
        photo = await uploadPhotoToServer();
      } else {
        photo = "https://robohash.org/1a1e2c60b53334f267dc4c8cb3997b5c?set=set4&bgset=&size=400x400";
      };

      console.log("registration avatar", photo);

      dispatch(authSignUpUser({
        ...state,
        photo,
      })).then(data => {
        if (data === undefined || !data.uid) {
          alert('Authorization fails');
          console.log(data);
        }
        //else {
         // navigation.navigate("Home");
       // };
      });
    };
  };
    
  const onInputFocus = textInput => {
    setIsActiveInput({
      [textInput]: true,
    });
  };

  const onInputBlur = textInput => {
    setIsActiveInput({
      [textInput]: false,
    });
  };

  const toggleShowPassword = () => {
    setIsShowPassword(prevState => !prevState);
  };

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={hideKeyboard}
        style={styles.container}
      >
        <ImageBackground source={imageBg} style={styles.imageBg}>
          <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
            <KeyboardAvoidingView
              style={styles.wrapper}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? hp('5%') : hp('9%'),
                }}
              >
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarWrp}>
                    <Image
                      source={{ uri: state.avatarUri }}
                      style={styles.avatarImg}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonAvatar}
                    onPress={pickImage}>
                    <Text style={styles.buttonAvatarText}>{'+'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  inputMode="text"
                  placeholder="Логін"
                  value={state.login}
                  style={{
                    ...styles.input,
                    borderColor: isActiveInput.login ? '#FF6C00' : '#E8E8E8',
                  }}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    onInputFocus('login');
                  }}
                  onBlur={() => onInputBlur('login')}
                  onSubmitEditing={submit}
                  onChangeText={value => setState(prev => ({
                    ...prev,
                    login: value,
                  }))}
                />
                <TextInput
                  inputMode="email"
                  placeholder="Адреса електронної пошти"
                  value={state.email}
                  style={{
                    ...styles.input,
                    borderColor: isActiveInput.email ? '#FF6C00' : '#E8E8E8',
                  }}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    onInputFocus('email');
                  }}
                  onBlur={() => onInputBlur('email')}
                  onSubmitEditing={submit}
                  onChangeText={value => setState(prev => ({
                    ...prev,
                    email: value,
                  }))}
                />
                <View>
                  <TouchableOpacity
                    style={styles.buttonPassword}
                    onPress={() => toggleShowPassword()}
                  >
                    <Text style={styles.buttonPasswordText}>
                      {isShowPassword ? 'Показати' : 'Сховати'}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    inputMode="text"
                    placeholder="Пароль"
                    value={state.password}
                    secureTextEntry={isShowPassword}
                    style={{
                      ...styles.input,
                      borderColor: isActiveInput.password ? '#FF6C00' : '#E8E8E8',
                      paddingRight: 100,
                    }}
                    onFocus={() => {
                      setIsShowKeyBoard(true);
                      onInputFocus('password');
                    }}
                    onBlur={() => onInputBlur('password')}
                    onSubmitEditing={submit}
                    onChangeText={value => setState(prev => ({
                      ...prev,
                      password: value,
                    }))}
                  />
                  <TouchableOpacity style={styles.buttonForm} onPress={submit}>
                    <Text style={styles.buttonFormText}>{'Увійти'}</Text>
                  </TouchableOpacity>
                </View>
                <View >
                  <Text
                    style={styles.link}
                  >
                    Вже є акаунт?
                    <Text>  </Text>
                    <Text
                      style={styles.link_register}
                      onPress={() => navigation.navigate('Login')} >
                      Увійти
                    </Text>
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    paddingTop: hp('3%'),
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  title: {
    marginTop: 48,
    marginBottom: 16,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    fontWeight: '500',
  },
  input: {
    marginTop: 16,
    padding: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
  },
  buttonPassword: {
    position: 'absolute',
    top: 21,
    right: 6,
    zIndex: 1000,
    padding: 10,
    alignSelf: 'flex-end',
  },
  buttonPasswordText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B4371',
  },
  buttonForm: {
    height: hp('6%'),
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  buttonFormText: {
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#fff',
  },
  link: {
    marginTop: 16,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B4371',
  },
  link_register: {
    textDecorationLine: 'underline',
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
});

export default RegistrationScreen;