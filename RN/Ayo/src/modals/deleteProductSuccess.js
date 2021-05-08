import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function DeleteProductSuccess() {
return(

        <View style={{flexDirection:'column'}}>   
            <Text style={styles.textTop}>
            Delete Success
            </Text>           
              <Text style={styles.textBody}>
                Item has been deleted
              </Text>

        </View>
)
}
const styles=StyleSheet.create({
    textTop:{
        color: "#00ffaa",
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



