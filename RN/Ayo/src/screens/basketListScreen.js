import React from 'react';
import { View, Text, StatusBar, FlatList, StyleSheet, ImageBackground, SafeAreaView , TouchableOpacity} from 'react-native';
import {data} from '../mocks/data';
import Card from '../components/Card';
import {LinearGradient} from 'expo-linear-gradient';

const basketListScreen = ({navigation}) => {

    const renderItem = ({item}) => {
        return (
            <Card 
                itemData={item}
                onPress={()=> navigation.navigate('Basket Item Details', {itemData: item})}
            />
        );
    };

    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} 
      style={styles.Background}/>
        <View style = {styles.ContentContainer}>
        <View style = {styles.ListContainer}>
        <FlatList 
            showsVerticalScrollIndicator ={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.name}
        />
        </View>
        <View style= {{borderTopColor: '#fff', borderTopWidth: 1}}>
          <View style={{flexDirection:'row',marginHorizontal:5, marginTop: 10}}>
            <Text style={styles.totalText}>Total</Text>
            <View style = {styles.divider}/>
            <Text style={styles.totalText}>₱376.00</Text>
          </View>

          <TouchableOpacity style={styles.buttonCheckout} onPress = {() => navigation.navigate('Checkout')}> 
          <Text style={styles.buttonCheckoutText}>Checkout</Text>
          </TouchableOpacity>
          </View>
      </View>
      </SafeAreaView>
    );
};

export default basketListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
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
  totalSection:{
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopColor: 'white',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  divider:{
    height:1,
    borderColor: '#dddddd',
    borderWidth:0.5,
    flex:1,
    marginHorizontal:16,
    marginTop: '7%',
  },
  totalText: {
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginHorizontal: '3.5%',
    marginBottom: '7.5%',
    marginTop: '3%'
  },
  buttonCheckout:{
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
 buttonCheckoutText: {
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
 }
});