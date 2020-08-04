import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
 }
 from 'react-native';
import {Camera} from 'expo-camera';

import store from './store'
import { Provider } from 'react-redux';
import Player from './components/player.js'

export default function App() {


  const [permissions, setPermissions] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // const [scanned, setScanned] = useState(false);

  const getPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermissions(status === 'granted' ? true : false);
  }

  useEffect(() => {
    getPermissions();
  }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  return (
    <View style={styles.container}>
      <Provider store={store}>
      <StatusBar style="auto" />

      <Player />

      <Camera style={styles.container} type={type} >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
        </View>
      </Camera>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
