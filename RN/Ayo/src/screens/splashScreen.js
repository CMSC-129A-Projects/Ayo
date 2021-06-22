import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import { connect } from 'react-redux';

const splashScreen = ({navigation, user}) => {
  const [initRoute, setinitRoute] = useState('');

  useEffect(() => {
    presetInitRoute();
  }, [])

  const presetInitRoute = () => {
    if(user.id != ""){
      switch(user.role){
        case "Customer":
          setinitRoute("Customer Homes");
          break;
        case "Worker":
          setinitRoute("Pharmacy Homes");
          break;
        case "Owner":
          setinitRoute("Owner Homes");
          break;
        default:
          setinitRoute("Log In");
          break;
      }
    }
    else
      return setinitRoute("Log In")
  }

    return (
    <SafeAreaView style = {styles.container}>
    <StatusBar barStyle="light-content"/>
        <View style={styles.header}>
           <Animatable.Image 
                animation="bounceIn"
                duraton="1500"    
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title]}>Find the right medicine in your locality!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate(initRoute)}>
                <LinearGradient
                    colors={['#00DEAD', '#06AD91']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </SafeAreaView>

    );
};

const mapStateToProps = (state) => ({
    user: state.userData
})

export default connect(mapStateToProps)(splashScreen);

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#06AD91'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },

  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
  },
  title: {
      color: '#06AD91',
      fontSize: 30,
      fontWeight: 'bold',
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});