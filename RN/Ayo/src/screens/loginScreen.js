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

import {setUser, setUsername, setPassword, setJWTAccess, setJWTRefresh, setCustomer, setWorker, setOwner} from '../redux/Users/actions' 
import usersApi from '../api/Users';

import RejectModal from '../modals/RejectModal';
import WaitingModal from '../modals/WaitingModal';
import VerifiedModal from '../modals/VerifiedModal'; 
import { fetchUserDetails, login } from '../redux/Users/services';
import {connect} from 'react-redux';

// being consistent with what is in Django const getLoginData = () => {

function LogInScreen ({dispatch, username, password}) {
  const navigation = useNavigation();
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [wrongPassword, setWrongPasword] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [connectivityIssue, setConnectivityIssue] = useState(false);
  const [filledFields, setFilledFields] = useState(0); // scoring style: 3 - all unfilled, 2- password filled, 1 - username filled, 0 - all filld

  const callogin = async (values) => {
    const response = await login(values);
    if (response === "Unauthorized"){
      setWrongPasword(true);
      setWrongUser(true);
    }
    else if (response == "Not Found"){
      // TODO: something here
      console.log("not found");
    }
    else if (response == "Connectivity Issues"){
      // TODO: something here
      console.log("connectivity issues");
    }
    else{
      dispatch(setJWTAccess(response.data.jwt['access']));
      dispatch(setJWTRefresh(response.data.jwt['refresh']));

      // SUUUUUPER EXPLICIT
      console.log("SUCCESSFUL DETAILS ", response.data);
      const details = await fetchUserDetails(response.data.username, response.data.jwt['access']);
      if(response.data.is_staff || details.data.is_verified){
        dispatch(setUser(details.data));
        // dispatch(set(details.data));
        toggleVerify();
        setWaitingVisible(false);
        setRejectVisible(false);
        switch(response.data.role){
              case "Customer":
                    dispatch(setCustomer(details.data));
                    break;
              case "Worker":
                    dispatch(setWorker(details.data));
                    break;
              case "Owner":
                    dispatch(setOwner(details.data));
                    break;
              default:
                    break;
        }
      }
      else if(details.data.is_rejected){
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
            {wrongPassword ? <Text>Wrong password</Text> : null}
            {connectivityIssue? <Text>Connectivity Issues, try again.</Text> : null}
            {wrongUser ? <Text>No such user</Text> : null}
            <TextInput 
                placeholder = "Username"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                onChangeText = {(usernameInput) => dispatch(setUsername(usernameInput))}
                style = { filledFields == 3 || filledFields ==1 ? [styles.UsernameField, styles.unFilledField] : styles.UsernameField}/>
          </View>
          <View>
            <TextInput 
                placeholder = "Password"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                secureTextEntry
                onChangeText = {(passwordInput) => dispatch(setPassword(passwordInput))}
                style = { filledFields == 3 || filledFields == 2 ? [styles.PasswordField, styles.unFilledField] : styles.PasswordField}/>
          </View>
          <View>
            <TouchableOpacity style = {styles.LoginButton} onPress = {() => {
              setWrongPasword(false);
              setWrongUser(false);
              setConnectivityIssue(false);
              setFilledFields(0);
              if((username.length) > 0 && (password.length) > 0){ 
                callogin({username, password});
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


const mapStateToProps = (state) => { 
      return {
            username: state.userData.username,
            password: state.userData.password
      }
};

export default connect(mapStateToProps)(LogInScreen);

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
      height: '67%',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'center',
    },
    UsernameField: {
      flex: 0,
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
      flex: 0,
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
      flex: 0,
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
      flex: 0,
      borderWidth: 2,
      borderColor: '#ffffff',
      backgroundColor: 'transparent',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1%',
      marginBottom: '10%'
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