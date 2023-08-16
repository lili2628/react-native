import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {StyleSheet, Text, View, TextInput, ImageBackground, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Keyboard} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Container from '../../components/Container';
import { authSignInUser } from '../../redux/auth/uathOperations.js';


const LoginScreen = () => {
  const imageBg = require('../../images/bg-image.jpg');
  
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyBoard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({
    email: false,
    password: false,
  });
  const [isShowPassword, setIsShowPassword] = useState(true);
  const initialState = {
    email: '',
    password: '',
  };
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

  const submit = () => {
    hideKeyboard();

    const validEmail = validation(state.email);

    if (validEmail) {
      dispatch(authSignInUser(state)).then(data => {
        if (data === undefined || !data.user) {
          alert('Sign In is failed');
          console.log(data);
        } else {
          navigation.navigate("Home");
        };
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
                  paddingBottom: isShowKeyboard ? hp('3%') : hp('15%'),
                }}
              >
                <Text style={styles.title}>Увійти</Text>
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
                    Немає аккаунту?
                    <Text>  </Text>
                    <Text
                      style={styles.link_register}
                      onPress={() => navigation.navigate('Registration')}>
                      Зареєструватись
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
  }
});

export default LoginScreen;