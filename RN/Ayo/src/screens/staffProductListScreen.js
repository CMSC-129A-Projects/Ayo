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
        ScrollView,
        Dimensions,
        StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewProductDetails from '../modals/viewProductDetails'
import AddProductFail from '../modals/addProductFail'
import AddProductSuccess from '../modals/addProductSuccess'
import DeleteProductModal from '../modals/deleteProduct'
import DeleteProductSuccess from '../modals/deleteProductSuccess'
import DeleteProductFail from '../modals/deleteProductFail'
import EditProductModal from '../modals/editProduct'
import EditQuantity from '../modals/editQuantity'
import {Fontisto} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/Products/services';
import { setProductsList } from '../redux/Products/actions';

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

var tmpGenerics = [
  { label: 'valproic acid', value: 'valproic acid' },
  { label: 'fenofibrate', value: 'fenofibrate' },
  { label: 'olanzapine', value: 'olanzapine' },
  { label: 'rufinamide', value: 'rufinamide' },
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const productList = ({dispatch, products_list, user}) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
  const [deleteFailVisible, setDeleteFailVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [dropdownBar, setDropdownBar] = useState('brandname');
  const [searchBar, setSearchBar] = useState('');
  const [genericSearchBar, setGenericSearchBar] = useState('');
  const [enteredDisease, setEnteredDisease] = useState('');
  const [diseasesList, setDiseasesList] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
     (async () => {
       const response = await fetchProducts();
       dispatch(setProductsList(response.data));
    })();
  }, [])
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  
    console.log(result); //Details of the uploaded image
  
    if (result.cancelled)
      return null;
  
    setImage(result.uri); //Do not remove this as this is to display the image
  };


  console.log("PRODUCT DETAILS ARE ", products_list);

  const renderItem = ({ item }) => {
    console.log("ITEM IS ", item);
    const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
    const color = item.name === selectedId ? 'white' : 'black';
    return (
      <View style={styles.touchablesContainer}>
        <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
          setItemData(item);
          setModalVisible(!modalVisible); 
          
        }}>
            <View style = {styles.productPreviewTextContainer}>
              <Text style = {styles.productPreviewTextHeavy}>{item.name}</Text>
              <Text style = {styles.productPreviewText}>Generic Name: {item.generic_name}</Text>
              <Text style = {styles.productPreviewText}>Price: ₱{item.price}</Text>
            </View>
            <Image source={{ uri : item.product_img}}
                style={styles.productPreviewImage}
            />
        </TouchableOpacity>
      </View>
    );
  };

  const SortFlatlist = (dropOption, searchItem) => {
    var returnProducts = products_list;
    if(searchItem != ''){
      returnProducts = returnProducts.filter(item => {      
        const itemData = `${item.name.toLowerCase()}`;
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

  const SortGenerics = (searchItem) => {

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
                    //{ label: 'Generic Name', value: 'genericname'},
                    { label: 'Lowest Price', value: 'priceasc' },
                    { label: 'Highest Price', value: 'pricedesc' },
                ]}
              />
            </View>
        </View>
        <SafeAreaView style = {styles.ListContainer}>
          <FlatList data={SortFlatlist(dropdownBar, searchBar)}
                    extraData = {dropdownBar, searchBar}
                    renderItem={renderItem}
                    keyExtractor={item => item.description}
          />
        </SafeAreaView>
        <TouchableOpacity style = {styles.Button} onPress = {() =>{
          setModal2Visible(!modal2Visible);
        }}>
          <Text style = {styles.ButtonText}>ADD PRODUCT</Text>
        </TouchableOpacity>
      </View>

      <Modal //View product details
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
              <TouchableOpacity style={styles.editProductButton}
                                  onPress = {() =>{
                                  setEditVisible(!editVisible)
                                }}>
                <Text style = {styles.addProductButtonText}>
                  EDIT PRODUCT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteProductButton}
                                  onPress = {() =>{
                                  setDeleteVisible(!deleteVisible)
                                }}>
                <Text style = {styles.deleteProductButtonText}>
                  DELETE PRODUCT
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal //Edit Product Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={editVisible}
            onRequestClose = {() => {
                    setEditVisible(false); 
            }}>
      <View style={styles.editProductContainer}>
        <EditProductModal/>
        <View style={{flexDirection:"row-reverse",margin:10, position:'absolute'}}>
        <TouchableOpacity style={{ borderRadius:5,marginHorizontal:10,marginTop:330,paddingVertical:10,paddingHorizontal:50,backgroundColor:"#00d1a3"}}
         onPress={() => {
          setEditVisible(!editVisible)
          }}>
          <Text style={{color: "#ffff", alignSelf: 'center'}}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:5,marginHorizontal:10,marginTop:330, paddingVertical:10,paddingHorizontal:40, backgroundColor:'lightgray'}} 
          onPress={() => {
            setEditVisible(!editVisible)
          }}>
          <Text style={{color:'gray'}}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
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
     <Modal //Add Product Success Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={successVisible}
            onRequestClose = {() => {
                    setSuccessVisible(false); 
            }}>
      <View style={styles.addSuccessContainer}>
        <AddProductSuccess/>
        <TouchableOpacity>
          <Text style={{marginBottom:2,fontSize: 20, color: 'dodgerblue', fontWeight: 'bold', marginBottom: 1, alignSelf: 'flex-end'}} 
          onPress ={() =>
          setSuccessVisible(!successVisible)
          //setDeleteVisible(!deleteVisible)
          }>
            OK
          </Text>

        </TouchableOpacity>
      </View>
      </Modal> 
      <Modal //Add Product Fail Modal
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={failVisible}
            onRequestClose = {() => {
                    setFailVisible(false); 
            }}>
        <View style={styles.addFailContainer}>
        <AddProductFail/>
        <TouchableOpacity>
          <Text style={{marginBottom:2,fontSize: 20, color: 'dodgerblue', fontWeight: 'bold', alignSelf: 'flex-end'}} 
          onPress ={() => setFailVisible(!failVisible)}>
            OK
          </Text>

        </TouchableOpacity>
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
        <View style={{ marginLeft:80, marginTop: 40}}>
        <TouchableOpacity>
          <Text style={{fontSize: 25, color: 'dodgerblue', fontWeight: 'bold'}} 
          onPress ={() => setDeleteFailVisible(!deleteFailVisible)}>
            OK
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      </Modal>
      
      <Modal //Add Product Modal
            animationType = "slide"
            visible={modal2Visible}
            transparent={true}
            onRequestClose = {() => {
                    setModal2Visible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setModal2Visible(!modal2Visible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <View style = {styles.addProductDetailsContainer}>
                <View style = {styles.addProductDetailsTopField}>
                  <View style= {styles.addProductDetailsField}>
                    <Text style={styles.addProductTitleText}>
                      ADD PRODUCT
                    </Text>
                    <TextInput
                      placeholder = "Brand Name"
                      placeholderTextColor = '#ffffff'
                      underlineColorAndroid = "transparent"
                      style = {styles.inputField}
                    />
                    <View style = {styles.genericNameField}>
                      <TextInput 
                        placeholder = "Generic Name"
                        placeholderTextColor = '#ffffff'
                        underlineColorAndroid = "transparent"
                        value = {genericSearchBar}
                        style = {styles.genericNameInputField}
                        onChangeText = {genericSearchBar => setGenericSearchBar(genericSearchBar)}>
                      </TextInput>
                      <View style = {styles.dropdownField}>
                        <RNPickerSelect
                          placeholder = {{label: ''}}
                          pickerProps={{ style: {overflow: 'scroll' } }}
                          onValueChange={(toGenericField) => toGenericField!= 'add' ? setGenericSearchBar(toGenericField) : setModal3Visible(true)}
                          items={[
                              { label: 'Add...', value: 'add' },
                              ...tmpGenerics.sort((a, b) => a.label.localeCompare(b.name))
                          ]}
                        />
                      </View>
                    </View>
                    <TextInput
                        placeholder = "Price"
                        placeholderTextColor = '#ffffff'
                        underlineColorAndroid = "transparent"
                        style = {styles.inputField}
                      />
                    <EditQuantity/>
                  </View>
                  <View style = {styles.addProductDetailsImages}>
                    <TouchableOpacity style = {styles.ImagePreviewContainer} 
                                      onPress = {() => setViewImage(true)}>
                      {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
                      <Text style = {styles.PlaceholderText}>
                        PRODUCT IMAGE
                      </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.addImageButton} onPress = {pickImage}>
                      <Text style = {styles.addImageButtonText}>UPLOAD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  placeholder = "Description"
                  placeholderTextColor = '#ffffff'
                  underlineColorAndroid = "transparent"
                  style = {styles.inputDescriptionField}
                />
                <TouchableOpacity style = {styles.addProductButton}
                                  onPress = {() =>{
                                  setSuccessVisible(!successVisible);
                                  //setFailVisible(!failVisible);
                                  }}>
                  <Text style = {styles.addProductButtonText}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>

      <Modal //Add Generic Name Modal
            animationType = "slide"
            visible={modal3Visible}
            transparent={true}
            onRequestClose = {() => {
                    setModal3Visible(false);
                    setDiseasesList([]);
                    setEnteredDisease('');
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setModal3Visible(!modal3Visible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <View style = {styles.addProductDetailsContainer}>
                <View style = {styles.addProductDetailsTopField}>
                  <View style= {styles.addGenericDetailsField}>
                    <Text style={styles.addGenericTitleText}>
                      ADD GENERIC MEDICINE
                    </Text>
                    <TextInput
                      placeholder = "Generic Name"
                      placeholderTextColor = '#ffffff'
                      underlineColorAndroid = "transparent"
                      style = {styles.inputField}
                    />
                    </View>
                </View>
                <TextInput
                  placeholder = "Add Disease"
                  placeholderTextColor = '#dcdcdc'
                  underlineColorAndroid = "transparent"
                  style = {styles.inputDiseaseField}
                  onChangeText = {enteredText => setEnteredDisease(enteredText)}
                  value = {enteredDisease}
                />
                <TouchableOpacity style = {styles.addProductButton}
                                  onPress = {() => setDiseasesList(diseasesList => [...diseasesList, enteredDisease])}>
                  <Text style = {styles.addProductButtonText}>
                    ADD DISEASE
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList data = {diseasesList} renderItem = {diseaseData => <View><Text>{diseaseData.item}</Text></View>}/>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  products_list : state.productData.products_list ,
  user: state.userData
})

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
      borderBottomWidth: 4,
      borderColor: '#ffffff',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    addProductDetailsContainer: {
      justifyContent: 'center'
    },
    addProductDetailsTopField: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    addProductDetailsField: {
      width: '50%',
      marginLeft: '5%',
      justifyContent: 'flex-end'
    },
    addGenericDetailsField: {
      width: '93%',
      justifyContent: 'center'
    },
    addProductDetailsImages: {
      width: '50%',
      justifyContent: 'flex-end'
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
      justifyContent: 'space-between',
    },
    productPreviewTextContainer: {
      width: '55%',
      marginLeft: '7.5%',
    },
    productPreviewText: {
      fontSize: 15,
      fontFamily: 'Roboto',
    },
    productPreviewTextHeavy: {
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      flexWrap: 'nowrap',
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
    Button: {
      borderWidth: 3,
      borderColor: '#ffffff',
      borderRadius: 27,
      width: '100%',
      alignSelf:'center',
      alignItems:'center',
      padding: '2%',
      marginVertical: '1%',
      backgroundColor: 'rgba(100, 100, 100, 0.3)',
    },
    ButtonText: {
      color: '#ffffff',
      fontSize: 20,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    modalContainer : {
      height: '90%',
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
    inputField: {
      width: '100%',
      padding: '1%',
      borderRadius: 15,
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: '#dcdcdc',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      margin: "3.5%",
      alignSelf:'center'
    },
    genericNameField: {
      flexDirection:'row', 
      width: '100%',
      borderRadius: 17,
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: '#dcdcdc',
    },
    genericNameInputField: {
      width: '80%',
      padding: '1%',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      alignSelf:'center'
    },
    dropdownField:{
      width: '20%',
      height: '100%',
      alignSelf:'center'
    },
    inputDescriptionField: {
      width: '93%',
      padding: '1%',
      height: '30%',
      borderRadius: 15,
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: '#dcdcdc',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      marginTop: '3%',
      alignSelf:'center'
    },
    addProductTitleText: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      letterSpacing: 0.3,
      alignSelf: 'center',
      marginBottom: '5%',
      color: '#2a2a2a',
    },
    addGenericTitleText: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      letterSpacing: 0.3,
      alignSelf: 'center',
      color: '#2a2a2a',
    },
    addProductButton: {
      flex: 0,
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '4%',
      padding: '2%',
    },
    addProductButtonText: {
      color: '#ffffff',
      fontSize: 18,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    addImageButton: {
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: 125,
      alignSelf:'center',
      alignItems:'center',
      marginTop: '5%',
      padding: '1.5%',
    },
    addImageButtonText: {
      color: '#ffffff',
      fontSize: 14,
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
    modalAddContainer:{
      height: '25%',
      width: '85%',
      marginTop: 'auto',
      alignItems:'stretch',
      borderRadius: 20,
      borderWidth: 5,
      borderColor: '#00CCAA',
      alignSelf: 'center'
    },
    ImagePreviewContainer:{
      width: '65%',
      flexDirection: 'row',
      aspectRatio: 1,
      elevation: 7,
      borderWidth: 1,
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      justifyContent: 'center',
      marginHorizontal: '3%'
    },
    PlaceholderText: {
      flexShrink: 1,
      color: '#00d1a3',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center'
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
      marginTop: 'auto',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 5,
      borderColor: "#00d1a3",
      alignSelf: 'center'
    },
    productDetailsScrollView: {
      height: '67.5%',
    },
    editProductButton: {
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '3%',
      padding: '2%',
    },
    deleteProductButton: {
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
    deleteProductButtonText: {
      color: 'black',
      fontSize: 15,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
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
      backgroundColor: '#dcdcdc'
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
    editProductContainer:{
      backgroundColor: "#ffff",
      height: '50%',
      width: '90%',
      marginTop: 'auto',
      marginBottom: 40,
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#00d1a3',
      alignSelf: 'center'
    },
    imageZoomModal: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      borderWidth: 3,
      borderColor: 'black',
      marginTop: 'auto',
      marginBottom: 'auto'
    },
    imageZoom: {
      width: '95%',
      aspectRatio: 1,
      elevation: 7,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    inputDiseaseField:{
      width: '93%',
      padding: '1%',
      height: '23%',
      borderRadius: 15,
      borderWidth: 0.75,
      borderColor: 'black',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      marginTop: '1%',
      alignSelf:'center'
    },
  },
)