import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function DeleteProductFail() {
return(

        <View style={{flexDirection:'column'}}>   
            <Text style={styles.textTop}>
            Delete Error
            </Text>           
              <Text style={styles.textBody}>
                Item has NOT been deleted
              </Text>

        </View>
)
}
const styles=StyleSheet.create({
    textTop:{
        color: "#ff2626",
        marginVertical:1,
        marginTop:1,
        marginLeft: 5,
        fontSize:25, 
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textBody:{
        color:'#ffff',
        letterSpacing: 2,
        marginVertical:5,
        marginLeft: 5,
        marginTop: 10,
        fontSize:18, 
        textAlign:'left'

    }

})



