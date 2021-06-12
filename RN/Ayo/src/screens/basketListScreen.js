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
          <Text style={{fontSize: 30, fontStyle:'normal', fontWeight:'bold', fontFamily:'sans-serif-condensed'}}>Total</Text>
                        
          <View style = {styles.divider}/>
          <Text style={{fontSize:25,color:'#ffffff', fontWeight:'bold'}}>₱376.00</Text>
          </View>

          <TouchableOpacity onPress = {() => navigation.navigate('Checkout')}> 
          <LinearGradient
          colors={['#00f7c1', '#00ccaa']}
          style={styles.buttonCheckout}
          >
          <Text style={{fontSize:25, fontWeight: 'bold',color:'#ffffff'}}>Checkout</Text>
          </LinearGradient>
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
    flexDirection: 'column'
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
    height: '75%',
    width: '100%',
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
  marginTop: 20,
},
buttonCheckout:{
  backgroundColor:  '#00d1a3',
  width: '70%',
  borderRadius:10,
  alignSelf:'center',
  alignItems:'center',
  marginTop: '10%',
  padding: '2%',
  marginBottom: '8%',
  paddingVertical:10,
  width:'90%',
  marginHorizontal:10,
 },
});