import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button, TextInput} from 'react-native'


export default function EditQuantity() {
    const [quantityValue, setQuantityValue] = useState(1);

    const addQuantity = () => {
        setQuantityValue(quantityValue + 1)
    }
    const subtractQuantity = () => { 
        quantityValue > 1 ? setQuantityValue(quantityValue - 1): setQuantityValue(1);
    } 
return(
    <View style = {styles.quantityContainer}>
       <TouchableOpacity style={styles.minusButton}
         onPress = {() =>{
          quantityValue > 1 ? setQuantityValue(quantityValue - 1) : setQuantityValue(1);
         }}> 
        <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <TextInput style={styles.quantityNumber}
            onEndEditing  = {
              (quantityValue) => quantityValue >= 1 ? setQuantityValue(quantityValue) : setQuantityValue(1)
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

)
}
const styles=StyleSheet.create({
    quantityContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
        alignSelf: 'center'
    },

  minusButton:{
     width:30,
     backgroundColor: '#f0eeee',
     alignItems: 'center',
     justifyContent: 'center',
     borderTopLeftRadius: 25,
     borderBottomLeftRadius: 25,
  },
  plusButton:{
  width:30,
  backgroundColor: '#f0eeee',
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



