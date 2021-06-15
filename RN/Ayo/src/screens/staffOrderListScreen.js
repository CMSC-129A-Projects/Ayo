import React, {useState, useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        Modal,
        Image,
        FlatList,
        Platform,
        TouchableHighlight,
        Button,
        ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewProductDetails from '../modals/viewProductDetails'
import DeleteProductModal from '../modals/deleteProduct'
import {Fontisto} from '@expo/vector-icons';


var tmpOrders = [
    {
        name: "Order1",
        product_img: require("../assets/favicon.png"),
        tmpProducts :  [
          {
            name: "biogesic",
            description: "biogesic",
            price: 10,
            //in_stock: true , 
            product_img: require("../assets/favicon.png")
        },
        {
            name: "bioflu",
            description: "bioflue",
            price: 15,
            //in_stock: true ,
            product_img: require("../assets/favicon.png")
        },
        ]
    },
    {
      name: "Order2",
      product_img: require("../assets/favicon.png"),
      tmpProducts :  [
        {
          name: "biogesic",
          description: "biogesic",
          price: 10,
          //in_stock: true , 
          product_img: require("../assets/favicon.png")
      },
      {
          name: "bioflu",
          description: "bioflue",
          price: 15,
          //in_stock: true ,
          product_img: require("../assets/favicon.png")
      },
      ]
    },
    {
      name: "Order3",
      product_img: require("../assets/favicon.png"),
      tmpProducts :  [
        {
          name: "biogesic",
          description: "biogesic",
          price: 10,
          //in_stock: true , 
          product_img: require("../assets/favicon.png")
      },
      {
          name: "bioflu",
          description: "bioflue",
          price: 15,
          //in_stock: true ,
          product_img: require("../assets/favicon.png")
      },
      ]
    },
      {
        name: "Order4",
        product_img: require("../assets/favicon.png"),
        tmpProducts :  [
          {
            name: "biogesic",
            description: "biogesic",
            price: 10,
            //in_stock: true , 
            product_img: require("../assets/favicon.png")
        },
        {
            name: "bioflu",
            description: "bioflue",
            price: 15,
            //in_stock: true ,
            product_img: require("../assets/favicon.png")
        },
        ]
    },
      {
        name: "Order5",
        product_img: require("../assets/favicon.png"),
        tmpProducts :  [
          {
            name: "biogesic",
            description: "biogesic",
            price: 10,
            //in_stock: true , 
            product_img: require("../assets/favicon.png")
        },
        {
            name: "bioflu",
            description: "bioflue",
            price: 15,
            //in_stock: true ,
            product_img: require("../assets/favicon.png")
        },
        ]
    },
      {
        name: "Order6",
        product_img: require("../assets/favicon.png"),
        tmpProducts :  [
          {
            name: "biogesic",
            description: "biogesic",
            price: 10,
            //in_stock: true , 
            product_img: require("../assets/favicon.png")
        },
        {
            name: "bioflu",
            description: "bioflue",
            price: 15,
            //in_stock: true ,
            product_img: require("../assets/favicon.png")
        },
        ]
    },
    {
      name: "Order7",
      product_img: require("../assets/favicon.png"),
      tmpProducts :  [
        {
          name: "biogesic",
          description: "biogesic",
          price: 10,
          //in_stock: true , 
          product_img: require("../assets/favicon.png")
      },
      {
          name: "bioflu",
          description: "bioflue",
          price: 15,
          //in_stock: true ,
          product_img: require("../assets/favicon.png")
      },
      ]
  },
  {
          name: "Order8",
          product_img: require("../assets/favicon.png"),
          tmpProducts :  [
            {
              name: "biogesic",
              description: "biogesic",
              price: 10,
              //in_stock: true , 
              product_img: require("../assets/favicon.png")
          },
          {
              name: "bioflu",
              description: "bioflue",
              price: 15,
              //in_stock: true ,
              product_img: require("../assets/favicon.png")
          },
          ]
  }
  ]

  const orderList = () => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem =({item}) => {
      const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff" ;
      const color = item.name === selectedId ?  'white' : 'black';
      return (
        <View style = {styles.touchablesContainer}>
          <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {setModalVisible(!modalVisible)}}>
            <View>
              <Text style = {styles.productPreviewTextHeavy}> {item.name}</Text>
            </View>
            <Image source={item.product_img}
                style={styles.productPreviewImage}
            />
          </TouchableOpacity>
        </View>
      );
    }
    const renderItem2 =({item}) => {
      const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff" ;
      const color = item.name === selectedId ? 'white' : 'black';

      return (
        <View style = {styles.touchablesContainer}>
          <TouchableOpacity style = {styles.touchables} item = {item} backgroundColor = {{backgroundColor}} textColor = {{color}}>
            <Text style = {styles.productPreviewTextHeavy}>{item.name}</Text>
          </TouchableOpacity>
          <Image source = {item.product_img}
                  style = {styles.productPreviewImage}
          />
        </View>
      );
    }


    return(
      <SafeAreaView style  = {styles.Container}>
    
        <ImageBackground source = {require('../backgrounds/AyoDefaultBG.png')} style = {styles.Background}/>
        <View style ={ styles.ContentContainer}>
          <View>
            <Text style = {styles.ButtonText}>ORDERS</Text>
          </View>
          <SafeAreaView style ={styles.ListContainer}>
            <FlatList data = {tmpOrders}
            renderItem = {renderItem}
            keyExtractor = {item => item.name}
            />
          </SafeAreaView>
        </View>

        <Modal 
          animationType = 'slide'
          style = {styles.modal}
          //transparent = {true}
          visible = {modalVisible}
          onRequestClose = {() => {
            setModalVisible(false)}}>

<View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity style={{margin:15 , alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              </View>
              {/* {<ScrollView style = {styles.productDetailsScrollView}>
                <ViewProductDetails itemData={itemData}/>
              </ScrollView>} */}
              
                <FlatList
                          data= {tmpOrders.tmpProducts}
                          renderItem = {renderItem2}
                          keyExtractor = {item => item.description}/>
                   
                
                <View style = {{flex: 1, flexDirection: 'row', width: '70%', marginTop: 40}}>
                <TouchableOpacity style={styles.deleteButton}
                                    onPress = {() =>{
                                    //setDeleteVisible(!deleteVisible)
                                  }}>
                  <Text style = {styles.deleteButtonText}>
                  CONFIRM ORDER
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}
                                    onPress = {() =>{
                                    //setDeleteVisible(!deleteVisible)
                                  }}>
                  <Text style = {styles.deleteButtonText}>
                    DENY ORDER
                  </Text>
                </TouchableOpacity>
                </View>
              
              
              
          </View>
        </View>
      </Modal>
      </SafeAreaView>

      

    )
  }


  export default orderList;

  const styles = StyleSheet.create(
    {
        Container: {
          flex: 1
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
          width: '95%',
          height: '100%',
          alignSelf: 'center',
          position: 'absolute',
        },
        ListContainer:{
          marginTop: 70 , 
          width: '100%',
          height: '90%',
          borderBottomWidth: 4,
          borderTopWidth: 4,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
          alignSelf: 'center',
          justifyContent: 'center',

        },Button: {
          borderWidth: 3,
          borderColor: '#ffffff',
          borderRadius: 23,
          width: '70%',
          alignSelf:'center',
          alignItems:'center',
          marginTop: '4%',
          padding: '2%'
        },

        touchables: {
          
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        },
        touchablesContainer: {
         
          flexDirection: 'row',
          alignSelf:'center',
          width: '95%',
          margin: '1.5%',
          borderRadius: 15,
          backgroundColor: 'white',
          justifyContent: 'space-around',
        },
        productPreviewTextHeavy: {
          fontSize: 18,
          fontFamily: 'Roboto',
          fontWeight: 'bold'
        },
        ButtonText: {
          color: '#ffffff',
          fontSize: 40,
          letterSpacing: 1,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          flex: 1, position: 'absolute', alignSelf: 'center',  marginTop: 10,
        },
        modal:{
          backgroundColor:"#ffff",
          height: '25%',
          width: '90%',
          alignSelf: 'center'
        },
        deleteButton: {
          borderWidth: 3,
          borderColor: '#00d1a3',
          borderRadius: 23,
          width: '70%',
          alignSelf:'center',
          alignItems:'center',
          marginTop: '3%',
          padding: '2%',
          marginBottom: '8%'
        },
        deleteButtonText: {
          color: 'black',
          fontSize: 15,
          fontFamily: 'Roboto',
          fontWeight: 'bold'
        },
    }
    
  )