import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Button
 }
 from 'react-native';
 import * as Contacts from 'expo-contacts';

import store from './store'
import { Provider } from 'react-redux';
import Player from './components/player.js'

export default function App() {


  const [contacts, setContacts] = useState([]);

  const [hasPermission, setHasPermission] = useState(null);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setHasPermission(status === 'granted' ? true : false);
  }

  useEffect(() => {
    getPermissions();
    showContacts();
  }, []);

  const showContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  }



  return (
    
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Player contact={contacts} />
    </View>
     
    </Provider>
   
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
