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
import EditQuantity from '../modals/editQuantity';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/Products/services';
import { setProductsList } from '../redux/Products/actions';
import * as ImagePicker from 'expo-image-picker';
import AddProductFail from '../modals/addProductFail';
import AddProductSuccess from '../modals/addProductSuccess';


var tmpGenerics = [
    { label: 'valproic acid', value: 'valproic acid' },
    { label: 'fenofibrate', value: 'fenofibrate' },
    { label: 'olanzapine', value: 'olanzapine' },
    { label: 'rufinamide', value: 'rufinamide' },
  ]

const addProduct = () => {
    const navigation = useNavigation();
    const [genericSearchBar, setGenericSearchBar] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false);
    const [failVisible, setFailVisible] = useState(false);

    const showAddSuccess = () => {
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
      }, 2500);
    };
    const showAddFail = () => {
        setFailVisible(true);
        setTimeout(() => {
          setFailVisible(false);
        }, 2500);
    };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        {/* (async () => {
           const response = await fetchProducts();
           dispatch(setProductsList(response.data));
        })();*/}
      }, [])
      
    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    
    console.log(result); //Details of the uploaded image
    
    if (result.cancelled)
        return null;
    
    setImage(result.uri); //Do not remove this as this is to display the image
    };

    return (
        <SafeAreaView style = {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
          <View style = {styles.ContentContainer}>
              <View style = {styles.addProductDetailsContainer}>
                <Text style={styles.addProductTitleText}>
                      ADD PRODUCT
                </Text>
                <View style = {styles.addProductDetailsTopField}>
                  <View style= {styles.addProductDetailsField}>
                    <TextInput
                      placeholder = "Brand Name"
                      placeholderTextColor = '#ababab'
                      underlineColorAndroid = "transparent"
                      style = {styles.inputField}
                      onChangeText = {(nameInput) => setName(nameInput)}
                    />
                    <View style = {styles.genericNameField}>
                      <TextInput 
                        placeholder = "Generic Name"
                        placeholderTextColor = '#ababab'
                        underlineColorAndroid = "transparent"
                        value = {genericSearchBar}
                        style = {styles.genericNameInputField}
                        onChange= {genericSearchBarInput => setGenericSearchBar(genericSearchBarInput)}>
                      </TextInput>
                      <View style = {styles.dropdownField}>
                        <RNPickerSelect
                          placeholder = {{label: ''}}
                          pickerProps={{ style: {overflow: 'scroll' } }}
                          onValueChange={(toGenericField) => toGenericField!= 'add' ? setGenericSearchBar(toGenericField) : navigation.navigate("Add Generic Medicine")}
                          items={[
                              { label: 'Add...', value: 'add' },
                              ...tmpGenerics.sort((a, b) => a.label.localeCompare(b.name))
                          ]}
                        />
                      </View>
                    </View>
                    <TextInput
                        placeholder = "Price"
                        placeholderTextColor = '#ababab'
                        underlineColorAndroid = "transparent"
                        style = {styles.inputField}
                        onChangeText = {(priceInput) => setPrice(priceInput)}
                      />
                    <EditQuantity/>
                  </View>
                  <View style = {styles.addProductDetailsImages}>
                    <TouchableOpacity style = {styles.ImagePreviewContainer} 
                                      //onPress = {() => setViewImage(true)}
                                      >
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
                  placeholderTextColor = '#ababab'
                  underlineColorAndroid = "transparent"
                  style = {styles.inputDescriptionField}
                />
                <TouchableOpacity style = {styles.addProductButton}
                                  onPress = {() =>{
                                  showAddSuccess();
                                  //showAddFail();
                                  }}>
                  <Text style = {styles.addProductButtonText}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>
          </View>  
        </SafeAreaView>
    );
}

export default addProduct;

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
        resizeMode: 'cover',
      },
      ContentContainer:{
        backgroundColor: 'rgba(100, 100, 100, 0.3)',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        position: 'absolute',
      },
      addProductDetailsContainer: {
        justifyContent: 'center',
      },
      addProductDetailsTopField: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      addProductDetailsField: {
        width: '50%',
        marginLeft: '5%',
        justifyContent: 'flex-end'
      },
      genericNameField: {
        flexDirection:'row', 
        width: '100%',
        borderRadius: 17,
        borderWidth: 0.75,
        borderColor: 'black',
        backgroundColor: '#ffffff',
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
      addProductDetailsImages: {
        width: '50%',
        marginTop: '3%'
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
      inputField: {
            width: '100%',
            padding: '1%',
            borderRadius: 15,
            borderWidth: 0.75,
            borderColor: 'black',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 17,
            letterSpacing: 1,
            margin: "3.5%",
            alignSelf:'center'
      },
      inputDescriptionField: {
        width: '93%',
        padding: '1%',
        height: '30%',
        borderRadius: 15,
        borderWidth: 0.75,
        borderColor: 'black',
        backgroundColor: '#ffffff',
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
        color: '#ffffff',
      },
      addImageButton: {
        borderWidth: 3,
        borderColor: '#ffffff',
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
        color: '#ababab',
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
      dropdownField:{
        width: '20%',
        height: '100%',
        alignSelf:'center'
      },
    }
)