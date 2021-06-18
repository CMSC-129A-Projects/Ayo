import React, {useEffect, useState}from 'react';
import { View, Image, Text, StatusBar, FlatList, StyleSheet, ImageBackground, SafeAreaView , Modal, TouchableOpacity} from 'react-native';
import {Data} from '../mocks/checkoutData';
import {AntDesign} from '@expo/vector-icons';

import DeleteProductModal from '../modals/deleteProduct';
import DeleteProductSuccess from '../modals/deleteProductSuccess';
import DeleteProductFail from '../modals/deleteProductFail';
import EditQuantityBasket from '../modals/editQuantityBasket';
import { fetchUserRequests } from '../redux/Orders/services';
import { connect } from 'react-redux';
import { setRequestList } from '../redux/OrderItems/actions';

const basketListScreen = ({navigation, dispatch, user, request_list}) => {

  useEffect(() => {
    (async () => {
      const val = await fetchUserRequests(user.id);
      dispatch(setRequestList(val))
    })()
  }, [])

  console.log("request list is ", request_list);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
  const [deleteFailVisible, setDeleteFailVisible] = useState(false);

  const showSuccess = () => {
    setDeleteSuccessVisible(true);
    setDeleteVisible(false);
    setTimeout(() => {
      setDeleteSuccessVisible(false);
    }, 2500);
  };
  const showFail = () => {
    setDeleteFailVisible(true);
    setDeleteVisible(false);
    setTimeout(() => {
      setDeleteFailVisible(false);
    }, 2500);
  };


    const renderItem = ({item}) => {  
        return (
            <SafeAreaView>
            <View style={styles.touchablesContainer}>
            <TouchableOpacity 
            onPress={()=> navigation.navigate('Basket Item Details', {itemData: item})}
             style={styles.touchables}>   
              <Image source={item.product_img}
                            style={styles.productPreviewImage}
                        />
                        <View>
                            <Text style = {styles.productPreviewText}>{item.product_id.name}</Text>
                            <Text style = {styles.productPreviewText}>Cost: ₱{item.cost}</Text>
                        <EditQuantityBasket/>
                        </View>
                        <TouchableOpacity style= {styles.delete}
                        onPress = {() =>{setDeleteVisible(!deleteVisible)}}>
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
    if (request_list.length > 0 ){
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} 
      style={styles.Background}/>
        <View style = {styles.ContentContainer}>  
        <View style = {styles.ListContainer}>
        <FlatList 
            showsVerticalScrollIndicator ={false}
            data={request_list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        </View>
        <View style= {{borderTopColor: '#fff', borderTopWidth: 1}}>
          <View style={{flexDirection:'row',marginHorizontal:5, marginTop: 10}}>
            <Text style={styles.totalText}>Total</Text>
            <View style = {styles.divider}/>
            <Text style={styles.totalText}>₱376.00</Text>
          </View>

          <TouchableOpacity style={styles.buttonCheckout} onPress = {() => navigation.navigate('Checkout')}> 
          <Text style={styles.buttonCheckoutText}>Checkout</Text>
          </TouchableOpacity>
          </View>
      </View>
      <Modal //Delete Product Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={deleteVisible}
            onRequestClose = {() => {
                    setDeleteVisible(false); 
            }}>
      <View style={styles.deleteProductContainer}>
        <DeleteProductModal/>
        <View style={{flexDirection:"row-reverse",margin:10}}>
        <TouchableOpacity style={{ borderRadius:5,marginHorizontal:10,marginVertical: 5,paddingVertical:10,paddingHorizontal:30,backgroundColor:"#00d1a3"}}
         onPress={() => {
          showSuccess();
          }}>
          <Text style={{color: "#ffff", alignSelf: 'center'}}>CONTINUE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:5,marginHorizontal:10,marginVertical: 5, paddingVertical:10,paddingHorizontal:30, backgroundColor:'lightgray'}} 
          onPress={() => {
            setDeleteVisible(!deleteVisible)
          }}>
          <Text style={{color:'gray'}}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Modal //Delete Success Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={deleteSuccessVisible}
            onRequestClose = {() => {
                    setDeleteSuccessVisible(false); 
            }}>
      <View style={styles.deleteSuccessContainer}>
        <DeleteProductSuccess/>
      </View>
      </Modal> 

      <Modal //Delete Fail Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={deleteFailVisible}
            onRequestClose = {() => {
                    setDeleteFailVisible(false); 
            }}>
      <View style={styles.deleteSuccessContainer}>
        <DeleteProductFail/>
      </View>
      </Modal>
      </SafeAreaView>
    );
          }
    else {
      return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Image source={require('../assets/emptycart.png')} 
      style={{height: '100%', width: '100%', resizeMode: 'contain', position: 'absolute', alignSelf: 'center'}}/>
      <View style = {{position: 'absolute', alignSelf: 'center', alignItems: 'center', marginTop: '120%'}}>
        <Text style = {{fontSize: 23, fontFamily: 'Roboto', fontWeight: 'bold'}}>Basket is empty</Text>
        <Text style = {{fontSize: 19, fontFamily: 'Roboto', fontWeight: '900', }}>Looks like you haven't added</Text>
        <Text style = {{fontSize: 19, fontFamily: 'Roboto', fontWeight: '900', }}>items to your basket yet</Text>
        <TouchableOpacity 
        style = {{borderRadius: 25, marginTop: 30 ,  paddingHorizontal: 20, backgroundColor: '#00ccaa', borderWidth: 3, borderColor: '#06AD91'}}
        onPress = {() =>{navigation.navigate('Product List')}}>
        <Text style = {{fontSize: 25, color: '#fff', marginVertical: 5, fontWeight: 'bold'}}>BROWSE PRODUCTS</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
    }
};

const mapStateToProps = (state) => {
  return {
    user: state.userData,
    request_list : state.orderItemData.request_list
  }
}

export default connect(mapStateToProps)(basketListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  Background: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'relative',
    resizeMode: 'cover'
},
  ContentContainer:{
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'absolute',
},
  ListContainer:{
    width: '100%',
    flex: 1,
    borderBottomWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  totalSection:{
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopColor: 'white',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  divider:{
    height:1,
    borderColor: '#dddddd',
    borderWidth:0.5,
    flex:1,
    marginHorizontal:16,
    marginTop: '7%',
  },
  totalText: {
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginHorizontal: '3.5%',
    marginBottom: '7.5%',
    marginTop: '3%'
  },
  buttonCheckout:{
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 27,
    width: '95%',
    alignSelf:'center',
    alignItems:'center',
    padding: '2%',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#00ccaa',
 },
 buttonCheckoutText: {
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
 },
 touchablesContainer: {
  alignSelf:'center',
  width: '100%',
  margin: '.5%',
  backgroundColor: 'white',
},
touchables: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
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
modal:{
  backgroundColor:"#ffff",
  height: '25%',
  width: '90%',
  alignSelf: 'center'
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
});
