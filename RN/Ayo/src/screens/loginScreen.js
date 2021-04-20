// TODO:
// - fix redux for this state

import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {getUsername, getPassword} from '../redux/loginScreen/selectors';
import {setUsername, setPassword} from '../redux/loginScreen/actions' 
import usersApi from '../api/Users';

import RejectModal from '../modals/RejectModal';
import WaitingModal from '../modals/WaitingModal';
import VerifiedModal from '../modals/VerifiedModal'; 

const actionDispatch = (dispatch) => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setPassword: (password) => dispatch(setPassword(password)),
})

// being consistent with what is in Django const getLoginData = () => {
const getLoginData = () => {
  return (
    {
      username: useSelector(getUsername),
      password: useSelector(getPassword),
    }
  )
}

const LogInScreen = () => {
  const {setUsername, setPassword}  = actionDispatch(useDispatch());
  const {username, password} = getLoginData(); 
  const navigation = useNavigation();
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [userData, setUserData] = useState(); //temporary

  const login = async (formdata) => {
    const response = await usersApi.post('login', formdata, {headers : {
      'Content-Type': 'multipart/form-data',
      }})

      const header = {
        headers:{
          'Authorization': "Bearer " + response.data.jwt 
        }
      }
      const payload = {
      }
    const secondresponse = await usersApi.get('user', payload, header);
    setUserData(secondresponse.data.data)

    console.log(secondresponse);
    // SUUUUUPER EXPLICIT
    if(secondresponse.data.data['is_verified']){
      toggleVerify();
      setWaitingVisible(false);
      setRejectVisible(false);
    }
    else if(secondresponse.data.data['is_rejected']){
      toggleRejected();
      setWaitingVisible(false);
      setVerifyVisible(false);
    }
    else{
      toggleWaiting();
      setVerifyVisible(false);
      setRejectVisible(false);
    }
  }

  const toggleVerify = () => {setVerifyVisible(!verifyVisible)};
  const toggleRejected = () => {setRejectVisible(!rejectVisible)};
  const toggleWaiting = () => {setWaitingVisible(!waitingVisible)};

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
        <View style={styles.FieldContainer}>
          <RejectModal toVisible={rejectVisible} toggle={toggleRejected}/>
          <WaitingModal toVisible={waitingVisible} toggle={toggleWaiting}/>
          <VerifiedModal toVisible={verifyVisible} toggle={toggleVerify}/>
          <View>
            <TextInput 
                placeholder = "Username"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                onChangeText = {(usernameInput) => setUsername(usernameInput)}
                style = {styles.UsernameField}/>
          </View>
          <View>
            <TextInput 
                placeholder = "Password"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                secureTextEntry
                onChangeText = {(passwordInput) => setPassword(passwordInput)}
                style = {styles.PasswordField}/>
          </View>
          <View>
            <TouchableOpacity style = {styles.LoginButton} onPress = {() => {
              const formdata = new FormData();
              formdata.append('username', username); 
              formdata.append('password', password); 
              login(formdata);
            }}>
              <Text style = {styles.ButtonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.SignupButton} onPress = {() => navigation.navigate("Sign Up")}>
              <Text style = {styles.ButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default LogInScreen;

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
    FieldContainer:{
      width: '100%',
      height: '70%',
      bottom: 0,
      alignSelf: 'flex-end',
      position: 'absolute',
      justifyContent: 'center',
    },
    UsernameField: {
      width: '70%',
      padding: '1%',
      borderRadius: 15,
      borderColor: '#ffffff',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      marginBottom: '5%',
      alignSelf:'center'
    },
    PasswordField: {
      width: '70%',
      padding: '1%',
      borderRadius: 15,
      borderColor: '#ffffff',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      margin: "2.5%",
      alignSelf:'center'
    },
    LoginButton: {
      backgroundColor: '#00d1a3',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1%',
      elevation: 3
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
    ButtonText: {
      color: '#ffffff',
      fontSize: 17,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    }
  }
)