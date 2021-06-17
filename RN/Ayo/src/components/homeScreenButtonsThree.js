import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native';

import {icons} from '../constants/icons'

export default function homeScreenButtons({buttonVals}) {
      const navigation = useNavigation();
      return (
            <View style={styles.container}>
                  <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate(buttonVals[0].screen)}>
                        <View style = {styles.contentContainer}>
                              <Image style= {styles.icon} source={buttonVals[0].img}/>
                              <Text style={styles.title}>{buttonVals[0].title}</Text>
                        </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate(buttonVals[1].screen)}>
                        <View style = {styles.contentContainer}>
                              <Image style={styles.icon} source={buttonVals[1].img}/>
                              <Text style={styles.title}>{buttonVals[1].title}</Text>
                        </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate(buttonVals[2].screen)}>
                        <View style = {styles.contentContainer}>
                              <Image style={styles.icon} source={buttonVals[2].img}/>
                              <Text style={styles.title}>{buttonVals[2].title}</Text>
                        </View>
                  </TouchableOpacity>
            </View>
      )
}

const styles = StyleSheet.create({
      container : {
            flexDirection: "row",
            justifyContent: "center",
            margin: '2%'
      },
      icon : {
            height: 100,
            width: 100
      },
      contentContainer: {
            width: 100,
            flexWrap: 'wrap',
            alignItems: 'center',
      },
      button : {
            alignItems: "center",
            borderRadius: 5,
            marginHorizontal: '3%',
            flexWrap: 'wrap'
      },
      title : {
            margin: '1%',
            fontFamily: 'Roboto',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
      }
})

