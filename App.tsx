import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from './mapStyle';

interface propsCoords {
  latitude: number
  longitude: number
  description: string
}

const initialProps = {
  latitude: -3.0244864,
  longitude: -60.0375296,     
  description: ''
}

export default function App() {
  const [dataPointA, setDataPointA] = useState<propsCoords>(initialProps)
  const [dataPointB, setDataPointB] = useState<propsCoords>(initialProps)
  const mapRef = useRef<any>(null);

  const onLoayoutMap = () => {
    if (!dataPointA.description || !dataPointB.description) return;

    mapRef.current.fitToSuppliedMarkers(['pointA', 'pointB'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }

  return (   
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='auto'/>      
      <MapView 
        ref={mapRef}
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: dataPointA.latitude,
          longitude: dataPointA.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        zoomControlEnabled
        scrollEnabled  
        minZoomLevel={5}
        maxZoomLevel={15}  
        onLayout={onLoayoutMap}  
        customMapStyle={mapStyle}  
      > 

        <MapViewDirections
          origin={dataPointA.description}
          destination={dataPointB.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={6}
          strokeColor="blue"
        />

        <Marker
          coordinate={dataPointA}
          title="Ponto A"
          description={dataPointA.description}
          identifier="pointA"
        >          
          <Image style={styles.avatar}
            source={{ uri: 'https://avatars.githubusercontent.com/MauricioAraujo1' }}/>         
        </Marker>

        <Marker
          coordinate={dataPointB}
          title="Ponto B"
          description={dataPointB.description}
          identifier="pointB"
        >
          <Image style={styles.avatar}
            source={{ uri: 'https://avatars.githubusercontent.com/MauricioAraujo1' }}/>
        </Marker>
      </MapView>
      
      <View style={styles.footer}>

        <GooglePlacesAutocomplete
          placeholder="Ponto a"
          styles={{
            container: {
              flex: 0,
              margin: 20,
              shadowOpacity: 0.75,
              shadowRadius: 5,
              shadowColor: 'blue',
              shadowOffset: { height: 10, width: 10 },
              borderColor: '#242f3e',
              borderRadius: 10,
              borderWidth: 1
            },
            textInput: {
              fontSize: 14,
              borderRadius: 10,
            },
          }}
          fetchDetails
          onPress={(data, details = null) => {
            setDataPointA({
              latitude: details?.geometry.location.lat || 0,
              longitude: details?.geometry.location.lng || 0,
              description: data.description
            })
          }}
          enablePoweredByContainer={false}
          minLength={3}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "pt-BR",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <GooglePlacesAutocomplete
          placeholder="Ponto b"
          styles={{
            container: {
              flex: 0,
              margin: 20,
              shadowOpacity: 0.75,
              shadowRadius: 5,
              shadowColor: 'blue',
              shadowOffset: { height: 10, width: 10 },
              borderColor: '#242f3e',
              borderRadius: 10,
              borderWidth: 1
            },
            textInput: {
              fontSize: 14,
              borderRadius: 10,
            },
          }}
          fetchDetails
          onPress={(data, details = null) => {
            setDataPointB({
              latitude: details?.geometry.location.lat || 0,
              longitude: details?.geometry.location.lng || 0,
              description: data.description
            })
          }}
          enablePoweredByContainer={false}
          minLength={3}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "pt-BR",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
              
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f2f2f2',
  },
  map: {   
    flex: 1, 
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  button: {
    backgroundColor: 'green',
    margin: 10,
    borderRadius: 50,    
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#f2f2f2'
  },
  informations: {
    paddingHorizontal: 20,    
    marginBottom: 12,
    marginHorizontal: 20,
    backgroundColor: '#c9c9c9',
    borderRadius: 50,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 50,    
  },
});
