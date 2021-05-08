import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function AddProductSuccess() {
return(

        <View>
              <View style={{alignItems:'flex-start'}}>
                <Image source={require('../assets/success.jpg')}
                style={styles.image}>
                </Image>
                <Text style={styles.text}>
                Product has been successfully added
              </Text>
              </View>

        </View>
)
}
const styles=StyleSheet.create({
    text:{
        marginVertical:1,
        marginHorizontal: 5,
        fontSize:18, 
        textAlign:'center'

    },
    image:{
        height:40, 
        width:60, 
        marginVertical:5, 
        position: 'relative', 
        alignSelf:'center'
    }

})



