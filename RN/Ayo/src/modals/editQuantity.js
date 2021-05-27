import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button, TextInput} from 'react-native'


export default function EditQuantity() {
    const [quantityValue, setQuantityValue] = useState(1);

    const addQuantity = () => {
        setQuantityValue(quantityValue + 1)
    }
    const subtractQuantity = () => { 
        console.log("add");
        quantityValue > 0 ? setQuantityValue(quantityValue - 1): setQuantityValue(0);
    } 
return(
    <View style = {styles.quantityContainer}>
        <View>
        <Text style={{fontSize:20, fontWeight:'bold', marginEnd: 20}}>Quantity</Text>
        </View>
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

)
}
const styles=StyleSheet.create({
    quantityContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
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
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth:1,
    borderRightColor: '#ffff',
    borderLeftColor: '#ffff',
    borderLeftWidth: 1,
    textAlign:'center'
  }

})



