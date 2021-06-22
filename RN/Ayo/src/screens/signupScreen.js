import React, {useState, useEffect} from 'react';
import {Platform,
        StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        Modal} from 'react-native';
import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import * as Location from 'expo-location';
import axios from 'axios';
import locApi from '../api/Location';

import {setUsername, setPassword, setName, setPasswordConfirm, setContactNumber, setAddress} from '../redux/Users/actions' 
import { set } from 'react-native-reanimated';

// being consistent with what is in Django

const SignUpScreen = ({dispatch, user, username, password, password_confirm, name, contact_number, address}) => {
    const navigation = useNavigation();
    const [firstStep, setFirstStepVisible] = useState(true);
    const [secondStep, setSecondStepVisible] = useState(false);
    const [thirdStep, setThirdStepVisible] = useState(false);
    const [filledFields1, setFilledFields1] = useState(0);
    const [filledFields2, setFilledFields2] = useState(0);
    const [location, setLocation] = useState("Press Get Location");
    const [errorMsg, setErrorMsg] = useState(null);

    console.log("USER IS", user);

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync().catch((error) => console.log(error));
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }  
        let location = await Location.getCurrentPositionAsync({});
        console.log(`&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`);
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.c4d3bc349c75133c9c91dc86dec37582&lat=${location.coords.latitude}&lon=${location.coords.longitude}&format=json`)
        console.log(response["data"]["address"]);
        setLocation(`${response["data"]["address"]["city"]}`);
        dispatch(setAddress(`${response["data"]["address"]["road"]}, ${response["data"]["address"]["village"]}, ${response["data"]["address"]["city"]}`))
    };
 
    /* TODO: 
        - INTEGRATE RED BORDER PARA SA: 
          = LACKING ENTRIES ONPRESS SA REGISTER
          = IF DILI MAO ANG PASSWORD UG PASSWORD_CONFIRM
          = IF SOBRA ANG NUMBERS SA CONTACT NUMBER OR NAAY DILI NUMBER
        - RESTRUCTURE KAY BASIN BATI NA TAN-AWON, I ADDED A PASSWORD CONFIRM TEXTINPUT
        - CONNECT TO BACKEND API (AXIOS.POST)
    */ 
      return (
        <SafeAreaView>
          <ImageBackground source={require('../backgrounds/AyoSignUp.png')} style={styles.Background}/>
            <View style={styles.ContentContainer}> 
              <Modal animationType="none"
                      transparent={true}
                      visible={firstStep}
                      onRequestClose={() => {
                        setFirstStepVisible(!firstStep);
                        navigation.navigate("Log In")}}
              >
                <View style = {styles.ContentContainer}>
                  <View>
                    <TextInput 
                        placeholder = "Username"
                        placeholderTextColor = '#dcdcdc'
                        underlineColorAndroid = "transparent"
                        onChangeText = {(usernameInput) => dispatch(setUsername(usernameInput))}
                        style = {styles.InputFields}/>
                  </View>
                  <View>
                    <TextInput 
                        placeholder = "Password"
                        placeholderTextColor = '#dcdcdc'
                        underlineColorAndroid = "transparent"
                        secureTextEntry
                        onChangeText = {(passwordInput) => dispatch(setPassword(passwordInput))}
                        style = {styles.InputFields}/>
                  </View>
                  <View>
                    <TextInput 
                        placeholder = "Confirm Password"
                        placeholderTextColor = '#dcdcdc'
                        underlineColorAndroid = "transparent"
                        secureTextEntry
                        onChangeText = {(passwordInput) => dispatch(setPasswordConfirm(passwordInput))}
                        style = {styles.InputFields}/>
                  </View>
                  <View>
                    <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                      setFirstStepVisible(!firstStep);
                      setSecondStepVisible(!secondStep);
                    }}>
                      <Text style = {styles.ButtonText}>NEXT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal animationType="none"
                      transparent={true}
                      visible={secondStep}
                      onRequestClose={() => {
                        setFirstStepVisible(!firstStep);
                        setSecondStepVisible(!secondStep)}}
              >
                <View style={styles.ContentContainer}>
                  <View>
                    <TextInput 
                        placeholder = "Full name"
                        placeholderTextColor = '#dcdcdc'
                        underlineColorAndroid = "transparent"
                        onChangeText = {(nameInput) => dispatch(setName(nameInput))}
                        style = {styles.InputFields}/>
                  </View>
                  <View>
                    <TextInput 
                        placeholder = "Contact Number"
                        placeholderTextColor = '#dcdcdc'
                        underlineColorAndroid = "transparent"
                        onChangeText = {(contactNumberInput) => dispatch(setContactNumber(contactNumberInput))}
                        style = {styles.InputFields}/>
                  </View>
                  <View>
                    <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                      setFirstStepVisible(!firstStep)
                      setSecondStepVisible(!secondStep)
                    }}>
                      <Text style = {styles.ButtonText}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                  <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                      setSecondStepVisible(!secondStep);
                      setThirdStepVisible(!thirdStep);
                    }}>
                      <Text style = {styles.ButtonText}>NEXT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal animationType="none"
                      transparent={true}
                      visible={thirdStep}
                      onRequestClose={() => {
                        setSecondStepVisible(!secondStep);
                        setThirdStepVisible(!thirdStep)}}
              >
                <View style={styles.ContentContainer}>
                  <View>
                    <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                      getLocation();
                    }}>
                      <Text style = {styles.ButtonText}>Get Location</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View style = {styles.InputFields}>
                      <Text style ={styles.LocationText}>{location}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                      setThirdStepVisible(!thirdStep)
                      setSecondStepVisible(!secondStep)
                    }}>
                      <Text style = {styles.ButtonText}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style = {styles.SignupButton} onPress = {() => {
                      setThirdStepVisible(!thirdStep);
                      navigation.navigate("Select Role")
                    }}>
                      <Text style = {styles.ButtonText}>SIGN UP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => { 
      return {
            user: state.userData,
            username: state.userData.username,
            password: state.userData.password,
            name: state.userData.name,
            password_confirm: state.userData.password_confirm,
            contact_number: state.userData.contact_number,
            address: state.userData.address
      }
};


export default connect(mapStateToProps)(SignUpScreen);

const styles = StyleSheet.create(
    {
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
        height: '60%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center'
      },
      InputFields: {
        width: '70%',
        flex: 0,
        padding: '1%',
        borderRadius: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
        marginVertical: '3%',
        alignSelf:'center'
      },
      SignupButton: {
        backgroundColor: '#00d1a3',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 15,
        padding: '1%',
        elevation: 3,
        marginVertical: '3%'
      },
      NextButton: {
        borderWidth: 2,
        flex: 0,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 15,
        padding: '1%',
        marginVertical: '2%'
      },
      ButtonText: {
        color: '#ffffff',
        fontSize: 17,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      LocationText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
      },
    }
  )