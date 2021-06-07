import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function AddProductFail() {
return(

        <View>
              <View style={{alignItems:'flex-start'}}>
                <Image source={require('../assets/warning.png')}
                style={styles.image}>
                </Image>
                <Text style={styles.text}>
                Product has not been added to Basket
              </Text>
              </View>

        </View>
)
}
const styles=StyleSheet.create({
    text:{
        marginVertical:1,
        marginHorizontal: 5,
        fontSize:20, 
        textAlign:'center'

    },
    image:{
        height:40, 
        width:45, 
        marginVertical:5, 
        position: 'relative', 
        alignSelf:'center'
    }

})



