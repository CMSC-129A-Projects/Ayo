// TODO:
// IMPLEMENT SUCCESS AND OR FAIL MODAL
import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'
import {Fontisto} from '@expo/vector-icons';

import usersApi from '../api/Users';

export default function verificationScreen({modalVisible, itemData, toggle}) {

      if(itemData == null)
            return null;

      const {name, username, contact_number, address, valid_id1} = itemData;
      
      const approve = async (username) => {
            const response = await usersApi.patch('/approve', {"username":username});
            Alert.alert(toggle()); 
      }

      const reject = async (username) => {
            const response = await usersApi.patch('/reject', {"username":username});
            Alert.alert(toggle()); 
      }

      return (
            <View>
            <Modal 
                  animationType = "slide"
                  style = {styles.modal}
                  transparent = {false}
                  visible={modalVisible}
                  onRequestClose = {() => {
                        Alert.alert("Modal closed.");
                  }}
            >
                  <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                              <TouchableOpacity style={{margin:15 , position: 'absolute'}} onPress = {() => {
                                    Alert.alert(toggle())
                              }}>
                                    <Fontisto name="close" size={30}/>
                              </TouchableOpacity>
                              <View style = {styles.UsernameField}>
                                    <Text>Name: {name}</Text>
                                    <Text>Address: {address}</Text>
                                    <Text>Contact Number: {contact_number}</Text>
                                    <Image source={valid_id1} style={styles.images}/>
                                    <View style = {{flex: 1, flexDirection: 'row'}}>
                                          <Button  onPress = {() => approve(username)} title='Approve' />
                                          <Button  onPress = {() => reject(username)} title='Reject' />
                                    </View>
                              </View>
                        </View>
                  </View>
            </Modal>
            </View>
      )
}

const styles = StyleSheet.create({
      images : {
            height: 150,
            width: 150
      },
    modal : {
      width: '100%',
      height: '100%',
      margin: 0,
      alignItems: "center",
      justifyContent: "center"
    },
    modalContainer : {
      height:'80%',
      flex: 1
    },
    modalView : {
      //backgroundColor: "#FFFFFF"
    },
      quantity : {
            marginVertical: 10,
            height: 30,
            width: 80,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            borderColor: '#000',
            borderWidth : 1
      },
      UsernameField: {
            width: '70%',
            padding: '3%',
            borderRadius: 15,
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 17,
            letterSpacing: 1,
            marginBottom: '5%',
            alignSelf:'center',
            position: 'absolute'
          },
      
})
