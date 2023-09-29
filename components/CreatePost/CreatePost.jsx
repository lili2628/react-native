import { Alert, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';

import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Camera, CameraType } from 'expo-camera';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

import { selectStateUserId, selectStateAvatar, selectStateLogin} from '../../redux/selectors';
import { db, myStorage } from '../../firebase/config.js';
import Container from '../Container/Container';
import ModalWrap from '../ModalWrap/ModalWrap';


const INITIAL_POST = {
  photoUri: '',
  titlePost: '',
  location: {
    latitude: '',
    longitude: '',
    postAddress: '',
  },
};


const CreatePost  = ({ navigation }) => {
  const [isActiveInput, setIsActiveInput] = useState({
    title: false,
    location: false,
  });
  const [isShowKeyboard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(INITIAL_POST);
  const [type, setType] = useState(CameraType.back);
  //const [permission, requestPermission] = Camera.useCameraPermissions();
  const [styleSendBtn, setStyleSendBtn] = useState({});
  const [styleRemoveBtn, setStyleRemoveBtn] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isDirtyForm, setIsDirtyForm] = useState(false);
  
  const isFocused = useIsFocused();
  const cameraRef = useRef();

  const userId = useSelector(selectStateUserId);
  const avatar = useSelector(selectStateAvatar);
  const login = useSelector(selectStateLogin);


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setState(INITIAL_POST);
      setIsDirtyForm(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    navigation.setParams({
      isDirtyForm,
    });
  }, [isDirtyForm]);

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

  useEffect(() => {
    if (!isFocused){
      return;
    }

    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need permissions to camera');
          return;
        }
      } catch (error) {
        console.log('permission camera', error.message);
      }

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need permissions to location');
          return;
        }
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});

        const [postAddress] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setState(prev => ({
          ...prev,
          location: { latitude, longitude, postAddress },
        }));
      } catch (error) {
        console.log('permission location', error.message);
      }

      try {
        if (Platform.OS !== 'web') {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
            alert('Sorry, we need permissions to library');
          }
        }
      } catch (error) {
        console.log('permission library', error.message);
      }
    })();
  }, [isFocused]);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (state.photoUri && !isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.activeButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.activeRemoveBtn,
      });

      return;
    }

    if (state.photoUri && isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.activeButtonForm,
        ...styles.changedButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.activeRemoveBtn,
        ...styles.changedRemoveBtn,
      });

      return;
    }

    if (!state.photoUri && !isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
      });

      return;
    }

    if (!state.photoUri && isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.changedButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.changedRemoveBtn,
      });

      return;
    }
  }, [state, isShowKeyboard]);



  //if (!permission.granted) {
   // return (
    //  <View style={styles.permission}>
     //   <Text style={{ textAlign: 'center' }}>
      //    We need your permission to show the camera
      //  </Text>
      //  <Button onPress={requestPermissionCam} title="grant permission" />
     // </View>
   // );
 // }

  const toggleCameraType = () => {
    console.log('flip camera');
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  //take photo by camera
  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();

        const newUri = await ImageManipulator(
          uri,
          [{resize: { height: 480, width: 680 }}],
          0.5
        );

        setState(prev => ({
          ...prev,
          photoUri: newUri,
        }));

        setIsDirtyForm(true);
      } catch (error) {
        console.log('takePhoto', error.message);
      }
    }
  };

  // choose photo from gallery
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
          [{resize: { height: 480, width: 680 }}],
          0.5
        );

        setState(prev => ({
          ...prev,
          photoUri: newUri,
        }));

        setIsDirtyForm(true);
      }
    } catch (error) {
      console.log('pickImage', error.message);
    }
  };

  const draggableMarker = async ({ latitude, longitude }) => {
    const time = Date.now().toString();
    try {
      const [postAddress] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setState(prev => ({
        ...prev,
        location: { latitude, longitude, postAddress, time },
      }));
    } catch (error) {
      console.log('draggableMarker ', error.message);
    }
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
  

  const uploadPostToServer = async () => {
    const postId = Date.now().toString();

    try {
      const response = await fetch(state.photoUri);
      const photo = await response.blob();
      const photoRef = ref(myStorage, `postImages/${postId}`);

      await uploadBytes(photoRef, photo);

      const link = await getDownloadURL(photoRef);

      return link;
    } catch (error) {
      alert('Photo Downloading is failed');
      console.log(error.message);
    }
    
  };

  const postPhoto = async () => {
    hideKeyboard();

    const postId = Date.now().toString();

    try {
      const photo = await uploadPostToServer();
      const postRef = doc(db, 'posts', postId);

      await setDoc(postRef, {
        photo,
        titlePost: state.titlePost ? state.titlePost : 'без назви',
        location: state.location,
        likes: 0,
        createdAt: Timestamp.fromDate(new Date()),
        updateAt: Timestamp.fromDate(new Date()),
        owner: {
          userId,
          login,
          avatar,
        },
      });
    } catch (error) {
      Alert.alert('post did not save on server', error.message);
    } finally {
      setState(INITIAL_POST);
      setIsDirtyForm(false);
      navigation.navigate("DefaultPostsScreen", { state });
    }
  };

  return ( 
    <Container style={styles.containerMain}>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.container}>

            <View style={styles.cameraWrp}>
              <Camera
                style={
                  isShowKeyboard
                  ? { ...styles.camera, height: hp('22%') }
                  : { ...styles.camera }
                }
                type={type}
                ref={cameraRef}
              >
                <TouchableOpacity
                  style={styles.buttonCapture}
                  onPress={takePhoto}
                >
                  <MaterialIcons name="photo-camera" size={24} color="white" />
                </TouchableOpacity>

              
                <TouchableOpacity
                  style={styles.buttonToggle}
                  onPress={toggleCameraType}
                >
                  <Feather name="repeat" size={24} color="white" />
                </TouchableOpacity>

                {state.photoUri !== '' && (
                  <View style={styles.takePhotoContainer}>
                    <Image
                      source={{ uri: state.photoUri }}
                      style={
                        isShowKeyboard
                        ? { ...styles.photo, height: hp('22%') }
                        : { ...styles.photo }
                      }
                      resizeMode="contain"
                    />
                  </View>
                )}

              </Camera>
            </View>

            {state.photoUri !== '' ? (
              <TouchableOpacity
                onPress={() => setState(prev => ({ ...prev, photoUri: '' }))}
              >
                <Text style={styles.buttonGalleryText}>Редагувати фото</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.buttonGalleryText}>Завантажити фото</Text>
              </TouchableOpacity>
            )}
            
            <View
              style={{
                paddingVertical: isShowKeyboard ? hp('0.96%') : hp('3.8%'),
                gap: isShowKeyboard ? hp('0.48%') : hp('1.92%'),
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  borderBottomColor: isActiveInput.title ? '#FF6C00' : '#E8E8E8',
                }}
                value={state.titlePost}
                onChangeText={value => {
                  setState(prev => ({ ...prev, titlePost: value }));
                  setIsDirtyForm(value.length > 0 ? true : false);
                }}
                onFocus={() => {
                  setIsShowKeyBoard(true);
                  onInputFocus('title');
                }}
                onBlur={() => onInputBlur('title')}
                inputMode="text"
                placeholder="Назва..."
              />

              <View style={styles.locationWrp}>
                <TouchableOpacity
                  style={styles.buttonLocation}
                  onPress={() => setModalVisible(true)}
                  disabled={!state.photoUri}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color={styles.locationIcon.fill}
                  />
                </TouchableOpacity>

                <TextInput
                  style={{
                    ...styles.input,
                    ...styles.inputLocation,
                    borderBottomColor: isActiveInput.location
                      ? '#FF6C00'
                      : '#E8E8E8',
                  }}
                  value={state.location?.title}
                  onChangeText={value => {
                    setState(prev => ({
                      ...prev,
                      location: { ...prev.location, title: value },
                    }));
                    setIsDirtyForm(value.length > 0 ? true : false);
                  }}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    onInputFocus('location');
                  }}
                  onBlur={() => onInputBlur('location')}
                  inputMode="text"
                  placeholder="Місцевість..."
                />

                {modalVisible && (
                  <ModalWrap
                    title="Місцезнаходження"
                    location={state.location}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    draggableMarker={draggableMarker}
                  />
                )}
              </View>

            </View>

          </View>

          <View style={styles.buttonsWrp}>

            <View>
              <TouchableOpacity
                style={styleSendBtn}
                disabled={!state.photoUri}
                onPress={postPhoto}
              >
                <Text
                  style={
                    !state.photoUri
                    ? styles.buttonFormText
                    : { ...styles.buttonFormText, ...styles.activeButtonFormText }
                  }
                >
                  Опублікувати
                </Text> 
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styleRemoveBtn}
                onPress={() => {
                  setState(INITIAL_POST);
                  setIsDirtyForm(false);
                  hideKeyboard();
                }}
                disabled={!state.photoUri}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={
                    !state.photoUri
                    ? styles.removeBtn.fill
                    : styles.activeRemoveBtn.fill
                  }
                />
              </TouchableOpacity>
            </View>

          </View>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};


const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  container: {
    marginTop: hp('3.8%'),
    marginBottom: 15,
  },
  cameraWrp: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  camera: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('28.8%'),
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#E8E8E8',
  },
  photo: {
    height: hp('28.8%'),
    width: wp('100%'),
  },
  buttonCapture: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonToggle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
  buttonGalleryText: {
    marginTop: hp('0.96%'),
    fontSize: 16,
    color: '#BDBDBD',
  },
  input: {
    paddingVertical: hp('1.92%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    borderBottomWidth: 1,
  },
  locationWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLocation: {
    flexDirection: 'column',
    flex: 24,
  },
  buttonLocation: {
    flex: 2,
  },
  locationIcon: {
    fill: '#BDBDBD',
  },

  buttonsWrp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonForm: {
    height: hp('6.12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },
  activeButtonForm: {
    backgroundColor: '#FF6C00',
  },
  changedButtonForm: {
    width: wp('90%'),
  },
  buttonFormText: {
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  activeButtonFormText: {
    color: '#fff',
  },
  removeBtn: {
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: hp('1%'),
    height: hp('6%'),
    width: wp('16.8%'),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    fill: '#DADADA',
  },
  activeRemoveBtn: {
    backgroundColor: 'rgba(246, 246, 246, 1)',
    fill: 'rgba(218, 218, 218, 1)',
  },
  changedRemoveBtn: {
    alignSelf: 'flex-start',
  },
});

export default CreatePost;