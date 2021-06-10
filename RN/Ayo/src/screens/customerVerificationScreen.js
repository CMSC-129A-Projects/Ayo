import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity, Image, Modal} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {Fontisto} from '@expo/vector-icons';

import usersApi from '../api/Users';
import VerificationScreen from '../modals/verificationScreen';
//tarongonon pa ang style maybe di rounded para different siya ug nawng sa buttons
//ug ang alignment sad diay

//mao ba ni ang gamiton para sa approval?
const customerVerificationScreen = () => {
    const navigation = useNavigation();
    // contains: username, name, valid_id1 (uri), contact_number, address
    const [users, setUsers] = useState();
    const [modalVisible, setModalVisible] = useState(false); 
    const [itemData, setItemData] = useState(null);
    
    const tmpUsers = [
        {
            name: "mmm",
            contact_number: "mmm",
            username: "mmm",
            address: "mmm",
            valid_id1: require("../assets/favicon.png")
        },
        {
            name: "yep",
            contact_number: "yep",
            username: "yep",
            address: "yep",
            valid_id1: require("../assets/favicon.png")
        },
        {
            name: "Juan Dela Cruz",
            contact_number: "0922331232",
            username: "mrlabalaba",
            address: "Kabangkalan, Mandaue",
            valid_id1: require("../assets/favicon.png")
        }
    ]

    const fetchUsers = async () => {
        // const response = await testScreen.get('http://localhost:8000/users/users').catch((err) => {
        const response = await usersApi.get('unverifiedcustomers').catch( (err) => {
                console.log("Error occured: ", err);
        })
        setUsers(response.data);
        // setUser(response.data);
    }


    // useEffect(() => {
    //     fetchUsers()
    // },[])

    return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.FieldContainer}>
                <FlatList 
                    data={tmpUsers}
                    keyExtractor= {(user) => user.username}
                    renderItem = {({item}) => {
                            return (
                                <View style={styles.touchables}>
                                    <TouchableOpacity onPress = {() => {
                                        setItemData(item);
                                        setModalVisible(!modalVisible);
                                    }}>
                                        <Text>{item.name}</Text>
                                        <Image source={item.valid_id1}
                                        // <Image source={{uri: item.valid_id1}}
                                            style={{width:150, height:150}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                    }}
                />
                {/* INGON ANIA LANG SA ANG STYLE FOR NOW, 
                    ANG MODAL NAA SA SCREEN MISMO, PERO IYANG CONTENTS NAA SA UBAN SCREEN
                */}
                <Modal 
                    animationType = "slide"
                    style = {styles.modal}
                    transparent
                    visible={modalVisible}
                    onRequestClose = {() => {
                           setModalVisible(false); 
                    }}
                >
                <View>
                    <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={{margin:100}} onPress = {() => setModalVisible(!modalVisible)}>
                                        <Fontisto name="close" size={30}/>
                                </TouchableOpacity>
                                {/* TAN-AWA NI */}
                                <VerificationScreen itemData={itemData}/>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

export default customerVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    Background: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        
      },
      FieldContainer:{
        width: '100%',
        height: '70%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      modal : {
        width: '100%',
        height: '100%',
        margin: 0,
        alignItems: "center",
        justifyContent: "center"
      },
      modalContainer : {
          height:'100%',
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: 'row',
      },
      modalView : {
            height: '75%',
            width: '100%',
            borderWidth: 1,
            borderColor: "#F2F2F2",
            backgroundColor: "#FFFFFF"
      },
  touchables: {
      flexDirection: 'row'
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
});