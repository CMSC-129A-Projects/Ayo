import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function ViewProductDetails({itemData}) {
      if(itemData == null)
            return null;

      const {name, description, price, in_stock, product_img} = itemData;

      return (
            <View>
                  <View style = {styles.TopDetailsContainer}>
                        <View style = {styles.TopTextContainer}>
                              <Text style = {styles.NameText}>Brand Name: {name}</Text>
                              <Text>Generic Name: N/A</Text>
                              <Text>Price: {price}</Text>
                        </View>
                        <Image source={product_img} style={styles.images}/>
                        </View>
                  <View style = {styles.barGraphic}/>
                  <View style = {styles.DescriptionContainer}>
                        <Text>
                              {description}
                        </Text>
                  </View>
            </View>
            
      )
}

const styles = StyleSheet.create({
      images : {
            height: 100,
            width: 100,
            marginRight: '5%'
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
            flexDirection: 'row',
            width: '90%',
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
            justifyContent: 'space-between'
      },
      TopTextContainer:{
            justifyContent: 'center'
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
