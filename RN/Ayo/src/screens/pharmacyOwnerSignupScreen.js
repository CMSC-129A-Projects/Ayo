import React, {useState, useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        Image,
        ImageBackground, 
        SafeAreaView,
        Platform,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import json2formdata from 'json2formdata'

import {getSelectSignup, getBusinessPermit} from '../redux/signupScreen/selectors';
import {setBusinessPermit} from '../redux/signupScreen/actions';

const actionDispatch = (dispatch) => ({
  setBusinessPermit: (valid_id1) => dispatch(setBusinessPermit(valid_id1)),
})

const pharmacyOwnerSignUpScreen = () => { 
    const navigation = useNavigation();
    const {setBusinessPermit} = actionDispatch(useDispatch());
    const finalval = useSelector(getSelectSignup);
    const business_permit = useSelector(getBusinessPermit);
    const [image, setImage] = useState(null);


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

      setImage(result.uri);
      setBusinessPermit(result.uri);
    };

    
    return (
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.ButtonContainer}>
              <View>
                <View style = {styles.ImagePreviewContainer}>
                  {image && <Image source={{ uri: image }} style={styles.ImagePreview} />}
                  <Text style = {styles.PlaceholderText}>
                    Business Permit
                  </Text>
                </View>
                <TouchableOpacity style = {styles.Button} onPress = {pickImage}>
                  <Text style = {styles.ButtonText}>UPLOAD PERMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                  const dataToUpload = json2formdata(JSON.stringify(finalval));
                  console.log("data wack: ", dataToUpload.get('name'));
                  console.log("sa dili pa musulodskie", JSON.stringify(finalval));
                  navigation.navigate("Homes")
                }}>
              <Text style = {styles.ButtonText}>SIGN UP</Text>
            </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    );
}

export default pharmacyOwnerSignUpScreen;

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
      ButtonContainer:{
        width: '100%',
        height: '70%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      Button: {
        backgroundColor: '#00d1a3',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '7%',
        borderRadius: 15,
        padding: '3%',
        elevation: 3
      },
      ButtonText: {
        color: '#ffffff',
        fontSize: 15,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      SignupButton: {
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '7%',
        borderRadius: 15,
        padding: '1%'
      },
      ImagePreviewContainer:{
        width: '50%',
        flexDirection: 'row',
        aspectRatio: 1,
        elevation: 7,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center'
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
      }
    }
  )