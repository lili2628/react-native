import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModalWrap = ({
  title,
  location,
  modalVisible,
  setModalVisible,
  draggableMarker,
}) => {
  const [draggableMarkerCoords, setDraggableMarkerCoords] = useState(location);
  const [isMoveMarker, setIsMoveMarker] = useState(false);

  const closeAndElevate = () => {
    setModalVisible(!modalVisible);
    draggableMarker(draggableMarkerCoords);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {title && (
            <View>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalSubTitle}>(режим редагування - перемісти маркер)</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.buttonClose}
            onPress={closeAndElevate}
          >
            <AntDesign name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.mapWrp}>
            <MapView
              style={styles.mapStyle}
              region={{
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            >
              {location && (
                <Marker
                  draggable={true}
                  title={location.title ? location.title : null}
                  pinColor={isMoveMarker ? 'green' : 'red'}
                  coordinate={draggableMarkerCoords}
                  onDragStart={()=>{setIsMoveMarker(true)}}
                  onDragEnd={e => {
                    const newCoords = e.nativeEvent.coordinate;
                    setDraggableMarkerCoords(prev => ({
                      ...prev,
                      ...newCoords,
                    }));
                  }}
                />
              )}
            </MapView>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dadee6',
  },
  modalView: {
    marginHorizontal: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  modalSubTitle: {
    alignSelf: 'center',
    marginBottom: hp('0.96%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  mapWrp: {
    height: hp('80%'),
    width: wp('90%'),
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});


export default ModalWrap;