import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import EditQuantity1 from '../modals/editQuantity1';
import {AntDesign} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const Card = ({itemData, onPress}) => {
  return (
    <SafeAreaView>
    <View style={styles.touchablesContainer}>
    <TouchableOpacity onPress={onPress} style={styles.touchables}>
      <Image source={itemData.product_img}
                    style={styles.productPreviewImage}
                />
                <View>
                    <Text style = {styles.productPreviewText}>{itemData.name}</Text>
                    <Text style = {styles.productPreviewText}>Price: ₱{itemData.price}</Text>
                    <EditQuantity1/>
                    
                </View>
                <TouchableOpacity style= {styles.delete}
                onPress = {() =>{}}>
                    <AntDesign
                    name= "delete"
                    size = {30}
                    color= "#ffffff"
                     />
                </TouchableOpacity>
                </TouchableOpacity>
                </View>
              </SafeAreaView>

  );
};

export default Card;

const styles = StyleSheet.create({
touchablesContainer: {
    alignSelf:'center',
    width: '95%',
    margin: '1.5%',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row'
},
touchables: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-around',
},
productPreviewText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginLeft: 1,
},
productPreviewImage: {
    width:80, 
    height:80,
    marginVertical: '5%',
    marginHorizontal: 30,
    marginLeft:20
},
item: {
    padding: '2.7%',
    borderWidth: 2,
    borderColor: '#ffffff',
    width: '90%',
    borderRadius: 35,
    marginVertical: '5.2%',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor:'#000000',
    shadowOffset:{
        width:0, height:2
    },
    shadowOpacity:0.25,
    shadowRadius: 5
},
itemText: {
    fontSize: 17,
    fontFamily: 'Roboto',
    letterSpacing: 0.3,
},
delete:{
    width: 45,
    height: 45,
    borderRadius: 15,
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#ff3d00',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    marginLeft:80,
    marginBottom:10,
},
swipedelete:{
    flex:1,
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#ff3d00',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'center',
    padding: 12,
    borderRadius: 15,
},
totalSection:{
    marginTop:10,
    marginHorizontal:5,
    borderTopWidth:2,
    borderTopColor:'white',
},
divider:{
    height:1,
    borderColor: '#dddddd',
    borderWidth:0.5,
    flex:1,
    marginHorizontal:16,
    marginTop: 20,
},
couponSection:{
    height:50,
    borderRadius:35,
    borderColor:'white',
    borderStyle:'solid',
    borderWidth: 1,
    paddingHorizontal: 25,
    marginTop:30,
    flexDirection:'row',
},
placeHolder:{
    opacity: 100,
    color:'#ffffff',
    fontFamily:'Roboto',
    fontSize: 20,
    fontWeight: '400',
},
buttonCheckout:{
borderWidth: 3,
borderColor: '#00d1a3',
backgroundColor:  '#00d1a3',
width: '70%',
borderRadius:10,
alignSelf:'center',
alignItems:'center',
marginTop: '10%',
padding: '2%',
marginBottom: '8%',
paddingVertical:10,
width:'90%',
marginHorizontal:10,
},
deleteProductContainer:{
backgroundColor: "#ffff",
height: '20%',
width: '80%',
marginTop: 'auto',
marginBottom: 290,
alignItems:'center',
borderRadius: 20,
borderWidth: 2,
borderColor: 'red',
alignSelf: 'center'
},
deleteSuccessContainer:{
backgroundColor: "#00000999",
height: '10%',
width: '100%',
marginTop: 'auto',
alignSelf: 'center',
flexDirection:'row',
},
checkItem:{  
height: 15,
width: 15,
marginTop: 10,
marginLeft: 5,
},
});