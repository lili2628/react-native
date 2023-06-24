import {
  Alert,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  StyleSheet, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useState } from 'react';
import Container from '../Container/Container';
import { Camera, CameraType } from 'expo-camera';


function CreatePost  ({ navigation }) {
    const [isActiveInput, setIsActiveInput] = useState(false);
    const [isShowKeyboard, setIsShowKeyBoard] = useState(false);

    const hideKeyboard = () => {
        Keyboard.dismiss();
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
  
  const [type, setType] = useState(CameraType.back);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.container}>
            <View style={styles.cameraWrp}>
              <Camera
                type={type}
              >
                <TouchableOpacity
                  style={styles.buttonCapture}
                >
                  <MaterialIcons name="photo-camera" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonToggle}
                >
                  <Feather name="repeat" size={24} color="white" />
                </TouchableOpacity>

              </Camera>
            </View>

            <View
              style={{
                paddingVertical: hp('0.96%'),
                gap: hp('0.48%'),
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  borderBottomColor: isActiveInput.title ? '#FF6C00' : '#E8E8E8',
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
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    onInputFocus('location');
                  }}
                  onBlur={() => onInputBlur('location')}
                  inputMode="text"
                  placeholder="Місцевість..."
                />
              </View>
            </View>
          </View>

          <View
            style={
              !isShowKeyboard
                ? { ...styles.buttonsWrp }
                : {
                    ...styles.buttonsWrp,
                    flexDirection: 'row-reverse',
                    marginTop: hp('5%'),
                  }
            }
          >
            <TouchableOpacity
            >
              <Text
                style={ styles.buttonFormText}
              >
                Опублікувати
              </Text> 
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                hideKeyboard();
              }}
            >
              <AntDesign
                name="delete"
                size={24}
                color={styles.removeBtn.fill
                }
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  permission: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    marginTop: hp('3.8%'),
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
    justifyContent: 'space-between',
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
    width: wp('50%'),
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
    marginBottom: hp('1%'),
    height: hp('6%'),
    width: wp('16.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#F6F6F6',
    fill: '#DADADA',
  },
  activeRemoveBtn: {
    backgroundColor: '#FF6C00',
    fill: '#FFFFFF',
  },
  changedRemoveBtn: {
    alignSelf: 'flex-start',
  },
});

export default CreatePost;