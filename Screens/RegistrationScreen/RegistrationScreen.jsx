
import React from "react";
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Container from '../../components/Container';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



function RegistrationScreen() {
  const navigation = useNavigation();
  const imageBg = require('../../images/bg-image.jpg');
  const [isShowKeyboard, setIsShowKeyBoard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState("");

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const backHome = () => navigation.navigate("Home");

  const validation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           
    if (reg.test(email) === true) {
      backHome();
    } else {
      alert('Please, enter email in valid form');
    }
  };

  const submit = () => {
    hideKeyboard();
    validation();
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
                  
                  </View>
                  <TouchableOpacity style={styles.buttonAvatar}>
                    <Text style={styles.buttonAvatarText}>{'+'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  inputMode="text"
                  placeholder="Логін"
                  value={login}
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
                  onChangeText={setLogin}
                />
                <TextInput
                  inputMode="email"
                  placeholder="Адреса електронної пошти"
                  value={email}
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
                  onChangeText={setEmail}
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
                    value={password}
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
                    onChangeText={setPassword}
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
}

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