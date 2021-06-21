import React, {useLayoutEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { setRequestList } from '../redux/OrderItems/actions';
import { edit_request, fetchUserRequests } from '../redux/Orders/services';


function EditQuantityBasket({item, dispatch, id, getTotalCost}) {
    const [quantityValue, setQuantityValue] = useState(1);
return(
    <View style = {styles.quantityContainer}>
       <TouchableOpacity style={styles.minusButton}
         onPress = {async () =>{
           if (item.quantity>1){
             const value = await edit_request({
               id : item.id,
               quantity: item.quantity - 1
             })
           }
            //  IF SUCCESSFUL
            const newList = await fetchUserRequests(id)
            dispatch(setRequestList(newList))
            getTotalCost(newList);
            // TODO: CATCH IF NOT
         }}> 
        <Text style= {{color:'#666666',fontSize:25, fontWeight: 'bold'}}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityNumber}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>{item.quantity}</Text>
        </View>
        <TouchableOpacity style={styles.plusButton}
        onPress = {async () =>{
             const value = await edit_request({
               id : item.id,
               quantity: item.quantity + 1
             })
            //  IF SUCCESSFUL
            const newList = await fetchUserRequests(id)
            dispatch(setRequestList(newList))
            getTotalCost(newList);
            // TODO: CATCH IF NOT
        }}> 
            <Text style= {{color:'#424242',fontSize:25, fontWeight: 'bold'}}>+</Text>
        </TouchableOpacity>
    </View>

)
}

const mapStateToProps = (state) => ({
  id : state.userData.id,
})

export default connect(mapStateToProps)(EditQuantityBasket);

const styles=StyleSheet.create({
    quantityContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
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



