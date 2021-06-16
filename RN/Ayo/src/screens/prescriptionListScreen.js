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
import ViewPrescriptionDetails from '../modals/viewPrescriptionDetails'
import AddProductFail from '../modals/addProductFail'
import AddProductSuccess from '../modals/addProductSuccess'
import DeleteProductModal from '../modals/deleteProduct'
import DeleteProductSuccess from '../modals/deleteProductSuccess'
import DeleteProductFail from '../modals/deleteProductFail'
import EditProductModal from '../modals/editProduct'
import EditQuantity from '../modals/editQuantity'
import {Fontisto} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

var tmpProducts = [
    {
        label: "Unnamed Prescription",
        date: new Date(),
        notes: 'for fever',
        prescription_img: require("../assets/favicon.png")
    },
    {
        label: "Cough",
        date: new Date(2020, 4, 18),
        notes: 'take strepsils',
        prescription_img: require("../assets/favicon.png")
    },
    {
        label: "High Blood Pressure",
        date: new Date(2020,5,12),
        notes: 'get rest',
        prescription_img: require("../assets/favicon.png")
    },
      {
        label: "Unnamed Prescription",
        date: new Date(2020,2,19),
        notes: 'for fever',
        prescription_img: require("../assets/favicon.png")
    },
      {
        label: "Unnamed Prescription",
        date: new Date(2020,7,8),
        notes: 'drink tea',
        prescription_img: require("../assets/favicon.png")
    },
      {
        label: "Unnamed Prescription",
        date: new Date(2020,2,11),
        notes: 'apply betadine',
        prescription_img: require("../assets/favicon.png")
    },
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.name}</Text>
</TouchableOpacity>
);

const prescriptionList = () => {
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
    }, []);

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

    const renderItem = ({ item }) => {
      const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
      const color = item.name === selectedId ? 'white' : 'black';
      return (
          <View style={styles.touchablesContainer}>
          <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
              setItemData(item);
              setModalVisible(!modalVisible); 
              
          }}>
              <View style = {styles.prescriptionPreviewTextContainer}>
                  <Text style = {styles.prescriptionPreviewTextHeavy}>{item.label}</Text>
                  <Text style = {styles.prescriptionPreviewText}>Date: {item.date.toDateString()}</Text>
              </View>
              <Image source={item.prescription_img}
                  style={styles.prescriptionPreviewImage}
              />
          </TouchableOpacity>
          </View>
      );
    };
        
    const SortFlatlist = (dropOption, searchItem) => {
        var returnProducts = tmpProducts;
        if(searchItem != ''){
          returnProducts = returnProducts.filter(item => {      
            const itemData = `${item.label.toLowerCase()} ${item.date.toDateString()}`;
            const search = searchItem.toLowerCase();
            return itemData.indexOf(search) > -1;    
          });
        }
        switch(dropOption) {
          case 'newest':   return returnProducts.sort((a, b) => b.date - a.date);
          case 'oldest':   return returnProducts.sort((a, b) => a.date - b.date);
          default: return returnProducts.sort((a, b) => b.date - a.date);
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
                    { label: 'Newest Date', value: 'newest'},
                    { label: 'Oldest Date', value: 'oldest' },
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
              <Text style = {styles.ButtonText}>ADD PRESCRIPTION</Text>
          </TouchableOpacity>
        </View>

        <Modal //View prescription details
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
              <ScrollView style = {styles.prescriptionDetailsScrollView}>
                <ViewPrescriptionDetails itemData={itemData}/>
              </ScrollView>
              <TouchableOpacity style={styles.editPrescriptionButton}
                                  onPress = {() =>{
                                  setEditVisible(!editVisible)
                                }}>
                <Text style = {styles.addPrescriptionButtonText}>
                  EDIT PRESCRIPTION
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deletePrescriptionButton}
                                  onPress = {() =>{
                                  setDeleteVisible(!deleteVisible)
                                }}>
                <Text style = {styles.deletePrescriptionButtonText}>
                  DELETE PRESCRIPTION
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal //Add Prescription Modal
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
                    <Text style={styles.addPrescriptionTitleText}>
                      ADD PRESCRIPTION
                    </Text>
                    <TextInput
                      placeholder = "Prescription Label"
                      placeholderTextColor = '#ffffff'
                      underlineColorAndroid = "transparent"
                      style = {styles.inputField}
                    />
                    <TextInput
                      placeholder = "Notes"
                      placeholderTextColor = '#ffffff'
                      underlineColorAndroid = "transparent"
                      style = {styles.inputNotesField}
                    />
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
                <TouchableOpacity style = {styles.addProductButton}
                                  onPress = {() =>{
                                  setSuccessVisible(!successVisible);
                                  //setFailVisible(!failVisible);
                                  }}>
                  <Text style = {styles.addPrescriptionButtonText}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>

      </SafeAreaView>
    );
} 

export default prescriptionList;

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
      justifyContent: 'space-around'
    },
    addProductDetailsImages: {
      marginVertical: '1%',
      width: '50%',
      justifyContent: 'flex-end', 
      alignSelf: 'center'
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
    prescriptionPreviewTextContainer: {
      width: '55%',
      marginLeft: '7.5%',
    },
    prescriptionPreviewText: {
      fontSize: 15,
      fontFamily: 'Roboto',
    },
    prescriptionPreviewTextHeavy: {
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      flexWrap: 'nowrap',
    },
    prescriptionPreviewImage: {
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
      width: '90%',
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
      margin: "2%",
      alignSelf:'center'
    },
    dropdownField:{
      width: '20%',
      height: '100%',
      alignSelf:'center'
    },
    inputNotesField: {
      width: '90%',
      padding: '1%',
      height: '20%',
      borderRadius: 15,
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: '#dcdcdc',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      alignSelf:'center'
    },
    addPrescriptionTitleText: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      letterSpacing: 0.3,
      alignSelf: 'center',
      marginBottom: '5%',
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
    addPrescriptionButtonText: {
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
    prescriptionDetailsScrollView: {
      flex: 1,
    },
    editPrescriptionButton: {
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
    deletePrescriptionButton: {
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
    deletePrescriptionButtonText: {
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