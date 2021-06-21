import React, { Component, useState } from 'react';
import { Modal, Text, ImageBackground, TouchableOpacity, View, Alert,StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';

function App({toVisible, toggle, dispatch, user}) {
  const navigation = useNavigation();

  const modalHeader=(
    <View style={styles.modalHeader}>
      <Text style={styles.title}>Login Successful</Text>
      <View style={styles.divider}></View>
    </View>
  )

  const modalBody=(
    <View style={styles.modalBody}>
      <Text style={styles.bodyText}>Proceeding to User Dashboard</Text>
    </View>
  )

  const modalFooter=(
    <View style={styles.modalFooter}>
      <View style={styles.divider}></View>
      <View style={{flexDirection:"row-reverse",margin:10}}>
        <TouchableOpacity style={{...styles.actions,backgroundColor: '#00d1a3'}} 
          onPress={() => {
            Alert.alert(toggle())
            console.log("PRESSING ", user);
            switch(user.role){
              case "Customer":
                navigation.navigate("Customer Homes")
                break;
              case "Worker":
                navigation.navigate("Pharmacy Homes")
                break;
              case "Owner":
                navigation.navigate("Owner Homes")
                break;
              default:
                break
            }
          }}>
          <Text style={styles.actionText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const modalContainer=(
    <View style={styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  )

  const modal = (
    <Modal
    animationType="slide"
      transparent={true}
      visible={toVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
)

  return (
    <View style={styles.container}>
      {modal}
    </View>
  );
}

const mapStateToProps = (state) => ({
  user : state.userData
})

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modal:{
    backgroundColor:"#00000099",
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer:{
    backgroundColor:"#f9fafb",
    width:"80%",
    borderRadius:5,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalHeader:{
    alignSelf: 'center',
  },
  text:{
    fontWeight:"bold",
    fontSize:35,
    padding:20,
    color:"#fff",
    letterSpacing: 1,
    alignSelf:'center'
  },
  title:{
    fontWeight:"bold",
    fontSize:20,
    padding:15,
    color:"#000"
  },
  divider:{
    width:"100%",
    height:1,
    backgroundColor:"lightgray"
  },
  modalBody:{
    backgroundColor:"#fff",
    paddingVertical:20,
    paddingHorizontal:10
  },
  modalFooter:{
    //alignItems:'center'
  },
  actions:{
    borderRadius:20,
    marginHorizontal:10,
    paddingVertical:10,
    paddingHorizontal:40,
  },
  actionText:{
    color:"#ffffff",
    alignSelf: 'center'
  },
  image:{
    width:'100%',
    height: '100%',
    resizeMode:'cover',
    position:'absolute',
  }
});
