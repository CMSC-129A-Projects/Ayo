import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function EditProductModal() {
return(
    <View style={{alignItems:'center'}}>
    <Text style={styles.textTop}>
    Edit Product
    </Text> 
    <View style={styles.barGraphic}/> 
    <View style = {styles.quantityContainer}>
        <View>
        <Text style={{fontSize:25, marginEnd: 20}}>Quantity</Text>
        </View>
        <TouchableOpacity style={styles.minusButton}>
            <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityNumber}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>1</Text>
        </View>
        <TouchableOpacity style={styles.plusButton}>
            <Text style= {{color:'#424242',fontSize:25, fontWeight: 'bold'}}>+</Text>
        </TouchableOpacity>
    </View>
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
    quantityContainer:{
        marginTop: 100,
        flexDirection: 'row',
        alignItems:'center',
    },
    barGraphic: {
        position:'absolute',
        width: '95%',
        height: 1.5,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        alignSelf: 'center', 
  },
  minusButton:{
     width:30,
     backgroundColor: '#cccccc',
     alignItems: 'center',
     justifyContent: 'center',
     borderTopLeftRadius: 25,
     borderBottomLeftRadius: 25,
  },
  plusButton:{
  width:30,
  backgroundColor: '#cccccc',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: 25,
  borderBottomRightRadius: 25,
},
  quantityNumber:{
    width:30,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth:1,
    borderRightColor: '#ffff',
    borderLeftColor: '#ffff',
    borderLeftWidth: 1

  }

})



