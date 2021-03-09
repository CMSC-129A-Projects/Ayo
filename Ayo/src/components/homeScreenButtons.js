import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

import {icons} from '../constants/icons'

export default function homeScreenButtons({buttonVals}) {
      return (
            <View style={styles.container}>
                  <TouchableOpacity style={styles.button}>
                        <Image style= {styles.icon} source={buttonVals[0].img}/>
                        <Text>{buttonVals[0].title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                        <Image style={styles.icon} source={buttonVals[1].img}/>
                        <Text>{buttonVals[1].title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                        <Image style={styles.icon} source={buttonVals[2].img}/>
                        <Text>{buttonVals[2].title}</Text>
                  </TouchableOpacity>
            </View>
      )
}

const styles = StyleSheet.create({
      container : {
            flexDirection: "row",
            justifyContent: "center",
            padding: 15,
      },
      icon : {
            height: 100,
            width: 100
      },
      button : {
            alignItems: "center",
            borderWidth: 1,
            borderColor: 'gray',
            height: 129,
            borderRadius: 5,
            marginHorizontal: 10,
      }
})

