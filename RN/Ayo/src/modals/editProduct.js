import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button, TextInput} from 'react-native'

export default function EditProductModal() {
    const [quantityValue, setQuantityValue] = useState(1);

    const addQuantity = () => {
        setQuantityValue(quantityValue + 1)
    }
    const subtractQuantity = () => { 
        quantityValue > 0 ? setQuantityValue(quantityValue - 1): setQuantityValue(0);
    } 
return(
    <View style={{alignItems:'center'}}>
    <Text style={styles.textTop}>
    Edit Product
    </Text> 
    <View style={styles.barGraphic}/> 
    <View style = {styles.quantityContainer}>
        <TouchableOpacity style={styles.minusButton}
         onPress = {() =>{
          quantityValue > 0 ? setQuantityValue(quantityValue - 1) : setQuantityValue(0);
         }}> 
        <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <TextInput style={styles.quantityNumber}
            onEndEditing  = {
              (quantityValue) => quantityValue >= 0 ? setQuantityValue(quantityValue) : setQuantityValue(0)
            }>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{quantityValue}</Text>
        </TextInput>
        <TouchableOpacity style={styles.plusButton}
        onPress = {() =>{
          setQuantityValue(quantityValue + 1)
        }}> 
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
        width:40,
        backgroundColor: '#f0eeee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth:1,
        borderRightColor: '#ffff',
        borderLeftColor: '#ffff',
        borderLeftWidth: 1,
        textAlign: 'center'
    }

})



