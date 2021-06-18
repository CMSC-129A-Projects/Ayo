import React, {useLayoutEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { setQuantity } from '../redux/OrderItems/actions'

function EditQuantity({dispatch, quantity}) {
return(
    <View style = {styles.quantityContainer}>
       <TouchableOpacity style={styles.minusButton}
         onPress = {() =>{
           if (quantity>1){
            dispatch(setQuantity(quantity- 1));
           }
         }}> 
        <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityNumber}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{quantity}</Text>
        </View>
        <TouchableOpacity style={styles.plusButton}
        onPress = {() =>{
            dispatch(setQuantity(quantity+ 1));
        }}> 
            <Text style= {{color:'#424242',fontSize:25, fontWeight: 'bold'}}>+</Text>
        </TouchableOpacity>
    </View>

)
}

const mapStateToProps = (state) => {
  return {
  quantity: state.orderItemData.quantity
  }
}

export default connect(mapStateToProps)(EditQuantity);

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
    width:50,
    backgroundColor: '#f0eeee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth:1,
    borderRightColor: '#ffff',
    borderLeftColor: '#ffff',
    borderLeftWidth: 1,


  }

})



