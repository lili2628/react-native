import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
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
        {location && <Marker title={location.title} coordinate={location} />}
      </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: hp('3.8%'),
  },
  mapWrp: {
    backgroundColor: 'pink',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mapStyle: {
    borderWidth: 4,
    borderColor: '#FF6C00',
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;