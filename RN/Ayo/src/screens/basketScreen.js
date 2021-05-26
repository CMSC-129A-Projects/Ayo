import React, {useState} from 'react';
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
import ViewProductDetails from '../modals/viewProductDetails'
import AddProductFail from '../modals/addProductFail'
import AddProductSuccess from '../modals/addProductSuccess'
import DeleteProductSuccess from '../modals/deleteProductSuccess'
import DeleteProductFail from '../modals/deleteProductFail'
import DeleteProductModal from '../modals/deleteProduct'
import EditQuantity1 from '../modals/editQuantity1'
import {Fontisto, MaterialIcons,AntDesign} from '@expo/vector-icons';

var tmpProducts = [
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
    {
        name: "maryjane",
        description: "maryjane",
        price: 100,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "paracetamol",
        description: "paracetamol",
        price: 20,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "mefenamic",
        description: "mefenamic",
        price: 25,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "alaxan",
        description: "alaxan",
        price: 10,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
    {
      name: "extrajoss",
      description: "extrajoss",
        price: 1,
        //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
    name: "elixir",
    description: "elixir",
    price: 200,
    //in_stock: true ,
    product_img: require("../assets/favicon.png")
  }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.itemText, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
const basketList = () => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [failVisible, setFailVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
    const [deleteFailVisible, setDeleteFailVisible] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [name, setname] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
        const color = item.name === selectedId ? 'white' : 'black';
        return (
            <View style={styles.touchablesContainer}>
            <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
                setItemData(item);
                setModalVisible(!modalVisible); 
                
            }}>
                <Image source={item.product_img}
                    style={styles.productPreviewImage}
                />
                <View>
                    <Text style = {styles.productPreviewText}>{item.name}</Text>
                    <Text style = {styles.productPreviewText}>Price: ₱{item.price}</Text>
                    <EditQuantity1/>
                    
                </View>
                <TouchableOpacity style= {styles.delete}
                onPress = {() =>{
                                  setDeleteVisible(!deleteVisible)
                                }}>
                    <AntDesign
                    name= "delete"
                    size = {30}
                    color= "#ffffff"
                     />
                </TouchableOpacity>

            </TouchableOpacity>
            </View>
        );
    };

    return(
        <SafeAreaView style= {styles.Container}>
            <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
            <View style = {styles.ContentContainer}>
                <SafeAreaView style = {styles.ListContainer}>
                    <FlatList data={tmpProducts}
                            renderItem={renderItem}
                            keyExtractor={item => item.description}
                    />
                    <View style ={styles.totalSection}>
                    <Text style={{fontSize: 30, fontStyle:'normal', fontWeight:'bold', fontFamily:'sans-serif-condensed'}}>Total</Text>
                        <View style={{flexDirection:'row',marginHorizontal:5}}>
                        <Text style={{ fontSize: 20, fontFamily:'normal'}}>Sub total</Text>
                        <View style = {styles.divider}/>
                        <Text style={{fontSize:25, fontWeight:'bold'}}>₱376.00</Text>
                        </View>

                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                        <Text style={{ fontSize: 20, fontFamily:'normal'}}>Shipping</Text>
                        <View style = {styles.divider}/>
                        <Text style={{fontSize:25, fontWeight:'bold'}}>₱0</Text>
                        </View>

                      {/*  <View style={styles.couponSection}>
                        <TextInput 
                        placeholderTextColor = "#ffffff"
                        placeHolder="Enter Voucher Code"
                        style={styles.placeHolder}/>
                        <View style={{height:'90%', width: 2, marginBottom:10, marginVertical:10, backgroundColor:'white'}}/>
                        <Text style={{fontSize:23, fontWeight:'bold', color:'white'}}>APPLY</Text>
                        </View>

                        <View/>*/}
                        <TouchableOpacity style={styles.buttonCheckout}>
                            <Text style={{fontSize:25, fontWeight: 'bold',color:'#ffffff'}}>CHECKOUT</Text>
                        </TouchableOpacity>

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
                            //setDeleteFailVisible(!deleteFailVisible)
                            setDeleteSuccessVisible(!deleteSuccessVisible)
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
                            <View style={{ marginLeft:100, marginTop: 40}}>
                            <TouchableOpacity>
                            <Text style={{fontSize: 25, color: 'dodgerblue', fontWeight: 'bold'}} 
                            onPress ={() => setDeleteSuccessVisible(!deleteSuccessVisible)}>
                                OK
                            </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>
                </View>
                </SafeAreaView>

            </View>
        </SafeAreaView>
    );
}

export default basketList;

const styles = StyleSheet.create(
    {
        Container: {
        flex:1  
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
            height: '100%',
            backgroundColor: 'rgba(100, 100, 100, 0.5)',
            alignSelf: 'center',
            justifyContent: 'center',
        },
        touchablesContainer: {
            alignSelf:'center',
            width: '95%',
            margin: '1.5%',
            borderRadius: 15,
            backgroundColor: 'white',
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
            elevation: 2
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
        borderRadius: 23,
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '10%',
        padding: '2%',
        marginBottom: '8%',
        paddingHorizontal: 50,
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
    }   
)