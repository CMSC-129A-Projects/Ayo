import React, {useState, useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        FlatList, 
      Modal, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import VerificationScreen from '../modals/verificationScreen';

import usersApi from '../api/Users';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const confirmationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedId, setSelectedId] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [users, setUsers] = useState()

  const toggle = () => {
    setModalVisible(!modalVisible);
    if(!modalVisible){
      setItemData(null);
      setSelectedId(null);
    }
  };

  const fetchUsers = async () => {
      // const response = await testScreen.get('http://localhost:8000/users/users').catch((err) => {
      const response = await usersApi.get('unverifiedcustomers').catch( (err) => {
              console.log("Error occured: ", err);
      })
      setUsers(response.data);
      // setUser(response.data);
  }
   
  useEffect(() => {
    fetchUsers()
  }, [modalVisible]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.username === selectedId ? "transparent" : "#ffffff";
    const color = item.username === selectedId ? 'black' : 'black';
    return (
      <View style={styles.touchablesContainer}>
        <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
            setItemData(item);
            setSelectedId(item.username)
            setModalVisible(true);
        }}>
            <View style = {styles.userPreviewTextContainer}>
              <Text style = {styles.userPreviewText}>{item.name}</Text>
              <Text style = {styles.userPreviewText}>{item.address}</Text>
              <Text style = {styles.userPreviewText}>{item.contact_number}</Text>
            </View>
            <Image source={item.valid_id1}
                style={styles.userPreviewImage}
            />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <VerificationScreen modalVisible={modalVisible} toggle={toggle} itemData={itemData}/>
      <View style = {styles.ContentContainer}>
        <SafeAreaView style={styles.ListContainer}>
          <FlatList
            data={users} //list of users goes here
            renderItem={renderItem}
            keyExtractor={(item) => item.username}
            extraData={selectedId} //User identifier
          />
        </SafeAreaView>

        {/* <TouchableOpacity style = {styles.ConfirmButton} >
          <Text style = {styles.ButtonText}>CONFIRM USER</Text>
        </TouchableOpacity>  
        <TouchableOpacity style = {styles.ViewButton} >
          <Text style = {styles.ButtonText}>VIEW DETAILS</Text>
        </TouchableOpacity>   */}
      </View>
              {/* TAN-AWA NI */}
    </SafeAreaView>
  );
}

export default confirmationScreen;

const styles = StyleSheet.create(
  {
    Container: {
      flex: 1,
      justifyContent: 'center'
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
      justifyContent: 'center',
    },
    ListContainer:{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    ConfirmButton: {
      backgroundColor: '#00d1a3',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1.5%',
      elevation: 3
    },
    ViewButton: {
      borderWidth: 2,
      borderColor: '#ffffff',
      backgroundColor: 'transparent',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '5%',
      borderRadius: 15,
      padding: '1.5%'
    },
    ButtonText: {
      color: '#ffffff',
      fontSize: 17,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    item: {
      padding: '2.7%',
      borderWidth: 2,
      width: '90%',
      borderRadius: 35,
      marginVertical: '5.2%',
      alignSelf: 'center',
      alignItems: 'center',
      elevation: 2
    },
    itemText: {
      fontSize: 17,
      fontFamily: 'Roboto',
      letterSpacing: 0.3,
      color: 'red'
    },
    touchablesContainer: {
      alignSelf:'center',
      width: '90%',
      margin: '3%',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    touchables: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userPreviewTextContainer: {
      width: '63%',
      marginLeft: '5%',
    },
    userPreviewText: {
      fontSize: 20,
      flexWrap : 'wrap',
      fontFamily: 'Roboto',
    },
    userPreviewImage: {
      width:80, 
      height:80, 
      margin: '5%'
    },
  }
)