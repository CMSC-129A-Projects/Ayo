// TODO:
// - style error messages

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

import {getUsername, getPassword, getUser} from '../redux/loginScreen/selectors';
import {setUser, setUsername, setPassword, setJWT} from '../redux/loginScreen/actions' 
import usersApi from '../api/Users';

import RejectModal from '../modals/RejectModal';
import WaitingModal from '../modals/WaitingModal';
import VerifiedModal from '../modals/VerifiedModal'; 

const actionDispatch = (dispatch) => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setPassword: (password) => dispatch(setPassword(password)),
  setJWT: (JWT) => dispatch(setJWT(JWT)),
  setUser: (details) => dispatch(setUser(details))
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
  const {setUser ,setUsername, setPassword, setJWT}  = actionDispatch(useDispatch());
  const {username, password} = getLoginData(); 
  const User = useSelector(getUser);
  const navigation = useNavigation();
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [userData, setUserData] = useState(); //temporary
  const [wrongPassword, setWrongPasword] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [connectivityIssue, setConnectivityIssue] = useState(false);
  const [filledFields, setFilledFields] = useState(0); // scoring style: 3 - all unfilled, 2- password filled, 1 - username filled, 0 - all filld

  const login = async (formdata) => {
    var has_error = false;
    const response = await usersApi.post('login', formdata, {headers : {
      'Content-Type': 'multipart/form-data',
      }})
      .catch((error) => {
        if(error.response){
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          if(error.response.data.detail === "Password")
            setWrongPasword(true);
          if(error.response.data.detail === "User")
            setWrongUser(true);
        }
        else if(error.request){
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          setConnectivityIssue(true);
        }
        else{
          console.log('Error ', error.message);
        }
        has_error = true;
      })

      if(has_error)
        return null;
      
    setJWT(response.data.jwt);
    const header = {
      headers:{
        'Authorization': "Bearer " + response.data.jwt 
      }
    }
    const payload = {
    }
    const secondresponse = await usersApi.get('user', payload, header);
    console.log(secondresponse.data.data);
    setUser(secondresponse.data.data)
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
  console.log("Field day " ,filledFields);

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
        <View style={styles.FieldContainer}>
          <RejectModal toVisible={rejectVisible} toggle={toggleRejected}/>
          <WaitingModal toVisible={waitingVisible} toggle={toggleWaiting}/>
          <VerifiedModal toVisible={verifyVisible} toggle={toggleVerify}/>
          <View>
            {wrongPassword ? <Text>Wrong password</Text> : null}
            {connectivityIssue? <Text>Connectivity Issues, try again.</Text> : null}
            {wrongUser ? <Text>No such user</Text> : null}
            <TextInput 
                placeholder = "Username"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                onChangeText = {(usernameInput) => setUsername(usernameInput)}
                style = { filledFields == 3 || filledFields ==1 ? [styles.UsernameField, styles.unFilledField] : styles.UsernameField}/>
          </View>
          <View>
            <TextInput 
                placeholder = "Password"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                secureTextEntry
                onChangeText = {(passwordInput) => setPassword(passwordInput)}
                style = { filledFields == 3 || filledFields == 2 ? [styles.PasswordField, styles.unFilledField] : styles.PasswordField}/>
          </View>
          <View>
            <TouchableOpacity style = {styles.LoginButton} onPress = {() => {
              setWrongPasword(false);
              setWrongUser(false);
              setConnectivityIssue(false);
              setFilledFields(0);
              console.log(username.length, password.length);
              console.log(username, password);
              if((username.length) > 0 && (password.length) > 0){ 
                const formdata = new FormData();
                formdata.append('username', username); 
                formdata.append('password', password); 
                login(formdata);
              }
              else{
                if(username.length === 0 && password.length === 0)
                  setFilledFields(3);
                else if(username.length === 0)
                  setFilledFields(1);
                else
                  setFilledFields(2);
              }
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
    unFilledField : {
      borderWidth: 3,
      borderColor: 'red',
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