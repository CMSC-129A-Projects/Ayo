// TODO: WAIT FOR API CALL TO BE A SUCCESS, THEN CALL THE SUCCESS API, ELSE NOT
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
        ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewProductDetails from '../modals/viewProductDetails'
import AddtoBasketFail from '../modals/addToBasketFail'
import AddtoBasketSuccess from '../modals/addToBasketSuccess'
import EditQuantity1 from '../modals/editQuantity1'
import {Fontisto, Entypo} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/Products/services';
import { setId, setProductsList } from '../redux/Products/actions';
import { add_request } from '../redux/Orders/services';

var tmpProducts = [
  {
      name: "biogesic",
      generic_name: "biogesic",
      description: 'for fever',
      price: 10,
      //in_stock: true , 
      product_img: require("../assets/favicon.png")
  },
  {
      name: "bioflu",
      generic_name: "bioflue",
      description: 'for flu',
      price: 15,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
      name: "maryjane",
      generic_name: "maryjane",
      description: 'illegal',
      price: 100,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "paracetamol",
      generic_name: "paracetamol",
      description: 'for pain',
      price: 20,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "mefenamic",
      generic_name: "mefenamic",
      description: 'sample description',
      price: 25,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "alaxan",
      generic_name: "alaxan",
      description: 'for energy',
      price: 10,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
    name: "extrajoss",
    generic_name: "extrajoss",
    description: 'energy',
      price: 1,
      //in_stock: true ,
    product_img: require("../assets/favicon.png")
},
  {
    name: "elixir",
    generic_name: "elixir",
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

const productList = ({dispatch, products_list, product_id, customer_id, quantity}) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [dropdownBar, setDropdownBar] = useState('brandname');
  const [searchBar, setSearchBar] = useState('')

  const values = {
    user_id : customer_id,
    quantity,
    product_id
  }
  console.log("VALUES ARE ", values);
  useEffect(() => {
    (async () => {
      let val = await fetchProducts(); 
      dispatch(setProductsList(val));
    })()
  }, [])
  const showSuccess = () => {
    setSuccessVisible(true);
    setTimeout(() => {
      setSuccessVisible(false);
    }, 2500);
  };
  const showFail = () => {
    setFailVisible(true);
    setTimeout(() => {
      setFailVisible(false);
    }, 2500);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
    const color = item.name === selectedId ? 'white' : 'black';
    var img = item.product_img;
    return (
      <View style={styles.touchablesContainer}>
        <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
          dispatch(setId(item.id))
          setItemData(item);
          setModalVisible(!modalVisible); 
          
        }}>
            <View style ={{flexDirection:'row'}}>
            <TouchableOpacity style= {styles.basket}
                onPress = {() =>{
                                  showSuccess();
                                }}>
                    <Entypo
                    name= "shopping-basket"
                    size = {30}
                    color= "#ffffff"
                     />
                </TouchableOpacity>
              <View style = {styles.productPreviewTextContainer}>
              <Text style = {styles.productPreviewTextHeavy}>{item.name}</Text>
              <Text style = {styles.productPreviewText}>Generic Name: {item.generic_name}</Text>
              <Text style = {styles.productPreviewText}>Price: ₱{item.price}</Text>
              </View>
            </View>
            <Image source={{uri : img}}
                style={styles.productPreviewImage}
            />
        </TouchableOpacity>
      </View>
    );
  };

  const SortFlatlist = (dropOption, searchItem) => {
    var returnProducts = products_list; //products_list;
    if(searchItem != ''){
      returnProducts = returnProducts.filter(item => {      
        const itemData = `${item.name.toLowerCase()} ${item.generic_name.toLowerCase()}`;
        const search = searchItem.toLowerCase();
        return itemData.indexOf(search) > -1;    
      });
    }
    switch(dropOption) {
      case 'brandname':   return returnProducts.sort((a, b) => a.name.localeCompare(b.name));
      //case 'genericname' return tmpProducts.sort((a, b) => a.genericname.localeCompare(b.genericname))
      case 'priceasc': return returnProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
      case 'pricedesc':  return returnProducts.sort((a, b) => (a.price < b.price) ? 1 : -1);
      default: return returnProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  
  return(
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
        <View style = {{flexDirection:'row'}}>
          <TextInput
            placeholder = "Search"
            placeholderTextColor = '#dcdcdc'
            underlineColorAndroid = "transparent"
            style = {styles.searchBar}
            onChangeText = {searchBar => setSearchBar(searchBar)}
          />
          <View style = {styles.dropdownBar}>
            <RNPickerSelect
                pickerProps={{ style: {overflow: 'scroll' } }}
                onValueChange={(dropdownBar) => setDropdownBar(dropdownBar)}
                placeholder = {{label: 'Sort' , color: 'gray'}}
                items={[
                    { label: 'Brand Name', value: 'brandname'},
                    { label: 'Lowest Price', value: 'priceasc' },
                    { label: 'Highest Price', value: 'pricedesc' },
                ]}
              />
            </View>
        </View>
        <SafeAreaView style = {styles.ListContainer}>
          <FlatList showsVerticalScrollIndicator = {false}
                    data={SortFlatlist(dropdownBar, searchBar)}
                    extraData = {dropdownBar, searchBar}
                    renderItem={renderItem}
                    keyExtractor={item => item.generic_name
                    }
          />
        </SafeAreaView>
      </View>

      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={modalVisible}
            onRequestClose = {() => {
                    setModalVisible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity style={{margin:15 , alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              </View>
              <ScrollView style = {styles.productDetailsScrollView}>
                <ViewProductDetails itemData={itemData}/>
              </ScrollView>
              <Text style={{fontSize:22, alignSelf:'center'}}>Quantity</Text>
                <EditQuantity1/>

              <TouchableOpacity style={styles.addProductButton}
              onPress ={() => {
                add_request(values);
                showSuccess();
              }}>
                <Text style = {styles.addProductButtonText}>
                  ADD TO BASKET
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
     <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={successVisible}
            onRequestClose = {() => {
                    setSuccessVisible(false); 
            }}>
      <View style={styles.addSuccessContainer}>
        <AddtoBasketSuccess/>
      </View>
      </Modal> 

      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={failVisible}
            onRequestClose = {() => {
                    showFail(); 
            }}>
        <View style={styles.addFailContainer}>
        <AddtoBasketFail/>
      </View>
      </Modal>

    </SafeAreaView>
  );
}


const mapStateToProps = (state) => {
    return{
        products_list: state.productData.products_list,
        product_id: state.productData.id,
        customer_id: state.userData.id,
        quantity: state.orderItemData.quantity
    }
}

export default connect(mapStateToProps)(productList);

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
      flex: 1,
      backgroundColor: 'rgba(100, 100, 100, 0.3)',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    addProductDetailsField: {
      width: '70%',
      padding: '3%',
      borderRadius: 15,
      borderColor: '#ffffff',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      marginTop: '3%',
      marginBottom: '5%',
      alignSelf:'center',
      position: 'absolute'
    },
    touchablesContainer: {
      alignSelf:'center',
      width: '100%',
      margin: '0.5%',
      backgroundColor: 'white',
    },
    touchables: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    productPreviewTextContainer: {
      width: '55%',
      marginLeft: '3%',
    },
    productPreviewText: {
      fontSize: 15,
      fontFamily: 'Roboto',
    },
    productPreviewTextHeavy: {
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    productPreviewImage: {
      width:80, 
      height:80, 
      marginVertical: '5%',
      marginRight: '7.5%'
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
    modalContainer : {
      height: '85%',
      marginTop: 'auto',
      backgroundColor:'#ffffff',
      borderTopWidth: 7,
      borderTopColor: '#dcdcdc',
      alignItems:'stretch',
    },
    modalView : {
      height: '100%'
     // backgroundColor: "transparent"
     //mao ni makacause sa di ma touch ang fontisto nga button
    },
    addProductButton: {
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '5%',
      padding: '2%',
      marginBottom: 10
    },
    buyProductButton: {
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
    addProductButtonText: {
      color: '#ffffff',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    buyProductButtonText: {
      color: 'black',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    header:{
      width:"100%",
      height:40,
      alignItems:'flex-end',
      justifyContent:'center',
    },
    ImagePreviewContainer:{
      width: '50%',
      flexDirection: 'row',
      aspectRatio: 1,
      elevation: 7,
      borderWidth: 1,
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      justifyContent: 'center',
      margin: '3%'
    },
    PlaceholderText: {
      flexShrink: 1,
      color: '#00d1a3',
      fontSize: 18,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    ImagePreview: {
      aspectRatio: 1,
      resizeMode: 'contain'
    },
    modal:{
      backgroundColor:"#ffff",
      height: '25%',
      width: '90%',
      alignSelf: 'center'
    },
    addFailContainer:{
      backgroundColor: "#ffff",
      height: '15%',
      width: '90%',
      marginTop: 'auto',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'red',
      alignSelf: 'center'
    },
    addSuccessContainer:{
      backgroundColor: "#ffff",
      height: '15%',
      width: '90%',
      marginVertical: '90%',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: "#00d1a3",
      alignSelf: 'center'
    },
    productDetailsScrollView: {
      height: '75%'
    },
    searchBar: {
      width: '70%',
      padding: '1%',
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: 'white',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 15,
    },
    dropdownBar: {
      width: '30%',
      flexDirection: 'column',
      backgroundColor: '#dcdcdc',
    },
    basket:{
      width: 45,
      height: 45,
      borderRadius: 25,
      borderColor: '#ffffff',
      borderWidth: 1,
      backgroundColor: '#00E8B5',
      justifyContent:'center',
      alignItems: 'center',
      alignSelf:'flex-end',
      marginHorizontal:5,
      marginRight:10,
      marginBottom:10,
      flexDirection:'row',
      marginLeft: '7.5%'
  },
  }
)