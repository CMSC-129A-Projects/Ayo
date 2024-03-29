import React from 'react';
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

const splashScreen = ({navigation}) => {

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
            <TouchableOpacity onPress={()=>navigation.navigate('Log In')}>
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

export default splashScreen;

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