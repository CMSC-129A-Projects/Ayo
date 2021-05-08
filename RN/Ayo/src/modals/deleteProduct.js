import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function DeleteProductModal() {
return(

        <View style={{alignItems: 'center'}}>   
            <Text style={styles.textTop}>
            Delete Item
            </Text>           
              <Text style={styles.textBody}>
                Are you sure want to delete product?
              </Text>

        </View>
)
}
const styles=StyleSheet.create({
    textTop:{
        marginVertical:1,
        marginTop:5,
        fontSize:25, 
        fontWeight: 'bold',
        textAlign:'center'
    },
    textBody:{
        color:'darkgray',
        marginVertical:5,
        marginTop: 15,
        fontSize:18, 
        textAlign:'center'

    }

})



