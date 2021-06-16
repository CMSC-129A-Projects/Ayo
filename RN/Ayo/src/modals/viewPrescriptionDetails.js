import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function ViewProductDetails({itemData}) {
      if(itemData == null)
            return null;

      const {label, date, notes, prescription_img} = itemData;

      return (
            <View style = {styles.container}>
                  <View style = {styles.TopDetailsContainer}>
                        <Text style = {styles.NameText}>Label: {label}</Text>
                        <Text>Date Added: {date.toDateString()}</Text>
                        <Text> </Text>
                        <Text>Notes: {notes}</Text>
                  </View>
                  <View style = {styles.barGraphic}/>
                  <Image source={prescription_img} style={styles.images}/>
            </View>
            
      )
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      images : {
            width: '90%',
            height: 200,
            aspectRatio: 1,
            alignSelf: 'center',
            justifyContent: 'center'
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
      TopDetailsContainer: {
            width: '90%',
            borderRadius: 15,
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 17,
            letterSpacing: 1,
            alignSelf:'center',
      },
      NameText: {
            fontSize: 17,
            fontFamily: 'Roboto',
            fontWeight: 'bold'
      },
      DescriptionContainer: {
            marginTop: '3%',
            width: '90%',
            alignSelf: 'center'
      },
      barGraphic: {
            width: '90%',
            height: '1%',
            marginVertical: '3%',
            borderRadius: 20,
            backgroundColor: 'black',
            alignSelf: 'center'
      }
})
