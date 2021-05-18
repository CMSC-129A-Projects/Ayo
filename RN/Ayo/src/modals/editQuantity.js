import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'


export default function EditQuantity() {
    const [quantityValue, setQuantityValue] = useState(1);

    const addQuantity = () => {
        setQuantityValue(quantityValue + 1)
    }
    const subtractQuantity = () => { 
        console.log("add")
        setQuantityValue(quantityValue - 1)
    } 
return(
    <View style = {styles.quantityContainer}>
        <View>
        <Text style={{fontSize:20, fontWeight:'bold', marginEnd: 20}}>Quantity</Text>
        </View>
       <TouchableOpacity style={styles.minusButton}
         onPress = {() =>{
        setQuantityValue(quantityValue - 1)
         }}> 
        <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityNumber}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{quantityValue}</Text>
        </View>
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
    borderLeftWidth: 1

  }

})



