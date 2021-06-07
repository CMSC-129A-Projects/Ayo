import React, { useState , useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        BackHandler,
        Alert,
        Modal,
        Image,
        Platform,
        Touchable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import json2formdata from 'json2formdata';

import {setValidId} from '../redux/signupScreen/actions';
import usersApi from '../api/Users';

import {getRole, getSelectSignup} from '../redux/signupScreen/selectors';
import {setRole} from '../redux/signupScreen/actions';
import {Fontisto} from '@expo/vector-icons';


const actionDispatch = (dispatch) => ({
  setRole: (role) => dispatch(setRole(role)),
})

const roleSelectScreen = () => {
    const {setRole} = actionDispatch(useDispatch());
    const navigation = useNavigation();
    const [customerVisible, setCustomerVisible] = useState(false);
    const [staffVisible, setStaffVisible] = useState(false);
    const [ownerVisible, setOwnerVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [viewImage, setViewImage] = useState(false);


    useEffect(() => {
      const backAction = () => {
        Alert.alert("Warning", "Go back the Log In screen? You will lose all your Sign Up information.", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.navigate("Log In") }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  
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
      setValidId(result.uri);
    };

    return (
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoSignUp.png')} style={styles.Background}/>
            <View style={styles.ContentContainer}>
              <Text style={styles.Title}>SELECT USER TYPE</Text>
              <View style = {styles.ButtonContainer}>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Customer");
                  setCustomerVisible(true);
                }}>
                  <Text style = {styles.ButtonText}>CUSTOMER</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Pharmacy Worker")
                  setStaffVisible(true);
                }}>
                  <Text style = {styles.ButtonText}>PHARMACY STAFF</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Owner")
                  setOwnerVisible(true);
                }}>
                  <Text style = {styles.ButtonText}>PHARMACY OWNER</Text>
                </TouchableOpacity>
              </View>
            </View>

        <Modal //Customer Upload ID Modal
          animationType = "slide"
          style = {styles.modal}
          transparent = {true}
          visible={customerVisible}
          onRequestClose = {() => {
                  setCustomerVisible(false); 
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setCustomerVisible(false)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <View style={styles.ModalButtonContainer}>
                <View>
                  <Text style={styles.ModalTitle}>CUSTOMER SIGN UP</Text>
                  <TouchableOpacity style = {styles.ImagePreviewContainer} onPress = {() => setViewImage(true)}>
                    {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
                    <Text style = {styles.PlaceholderText}>
                      ID Photo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.UploadButton} onPress = {pickImage}>
                    <Text style = {styles.UploadButtonText}>UPLOAD ID</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                    const formdata = json2formdata(JSON.stringify(finalval))
                    usersApi.post('register', formdata, {headers : {
                      'Content-Type': 'multipart/form-data',
                    }}).then(err => console.log(err))
                    navigation.navigate("Homes");
                    }
                  }>
                    <Text style = {styles.ButtonText}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal //Staff Upload Med License Modal
          animationType = "slide"
          style = {styles.modal}
          transparent = {true}
          visible={staffVisible}
          onRequestClose = {() => {
                  setStaffVisible(false); 
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setStaffVisible(false)}>
                        <Fontisto name="close" size={30}/>
                </TouchableOpacity>
                <View style={styles.ModalButtonContainer}>
                  <View>
                  <Text style={styles.ModalTitle}>STAFF SIGN UP</Text>
                  <TouchableOpacity style = {styles.ImagePreviewContainer} onPress = {() => setViewImage(true)}>
                    {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
                    <Text style = {styles.PlaceholderText}>
                      Medical License
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.UploadButton} onPress = {pickImage}>
                    <Text style = {styles.UploadButtonText}>UPLOAD LICENSE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                    const formdata = json2formdata(JSON.stringify(finalval))
                    usersApi.post('register', formdata, {headers : {
                      'Content-Type': 'multipart/form-data',
                    }}).then(err => console.log(err))
                    navigation.navigate("Homes");
                    }
                  }>
                    <Text style = {styles.ButtonText}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        
        <Modal //Owner Upload Permit Modal
          animationType = "slide"
          style = {styles.modal}
          transparent = {true}
          visible={ownerVisible}
          onRequestClose = {() => {
                  setOwnerVisible(false); 
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setOwnerVisible(false)}>
                        <Fontisto name="close" size={30}/>
                </TouchableOpacity>
                <View style={styles.ModalButtonContainer}>
                <View>
                  <Text style={styles.ModalTitle}>OWNER SIGN UP</Text>
                  <TouchableOpacity style = {styles.ImagePreviewContainer} onPress = {() => setViewImage(true)}>
                    {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
                    <Text style = {styles.PlaceholderText}>
                      Business Permit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.UploadButton} onPress = {pickImage}>
                    <Text style = {styles.UploadButtonText}>UPLOAD PERMIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                    const formdata = json2formdata(JSON.stringify(finalval))
                    usersApi.post('register', formdata, {headers : {
                      'Content-Type': 'multipart/form-data',
                    }}).then(err => console.log(err))
                    navigation.navigate("Homes");
                    }
                  }>
                    <Text style = {styles.ButtonText}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal //Image Zoom View
            animationType = "slide"
            visible={viewImage}
            transparent={true}
            onRequestClose = {() => {
                    setViewImage(false); 
            }}>
          <View style = {styles.imageZoomModal}>
            <TouchableOpacity style={{margin:15 , alignSelf:'flex-end'}} onPress = {() => setViewImage(false)}>
              <Fontisto name="close" size={30}/>
            </TouchableOpacity>
            <View style = {styles.imageZoom}>
              {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
            </View>
          </View>
      </Modal>
        </SafeAreaView>
    );
}

export default roleSelectScreen;

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
        width: '100%',
        height: '65%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      ButtonContainer:{
        width: '80%',
        height: 'auto',
        borderWidth: 4,
        borderRadius: 15,
        borderColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      Button: {
        backgroundColor: '#ffffff',
        width: '90%',
        alignSelf:'center',
        alignItems:'center',
        margin: '5%',
        borderRadius: 15,
        padding: '3%',
        elevation: 3
      },
      Title:{
        color: '#ffffff',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        textShadowRadius: 5,
        textShadowOffset: {width: 0, height: 2},
        textShadowColor: 'grey'
      },
      ButtonText: {
        color: '#00d1a3',
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      modal:{
        backgroundColor:"#ffff",
        height: '25%',
        width: '90%',
        alignSelf: 'center'
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
      },
      ModalButtonContainer:{
        width: '100%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
      },
      UploadButton: {
        backgroundColor: '#00d1a3',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '7%',
        borderRadius: 25,
        padding: '3%',
        elevation: 3
      },
      UploadButtonText: {
        color: '#ffffff',
        fontSize: 15,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      SignupButton: {
        borderWidth: 5,
        borderColor: '#00d1a3',
        backgroundColor: 'transparent',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '4%',
        borderRadius: 25,
        padding: '1%'
      },
      ImagePreviewContainer:{
        width: '70%',
        flexDirection: 'row',
        aspectRatio: 1,
        elevation: 7,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal: '3%'  
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
      ModalTitle:{
        color: '#00d1a3',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        textShadowRadius: 5,
        textShadowOffset: {width: 0, height: 2},
        textShadowColor: 'grey'
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
    }
  )