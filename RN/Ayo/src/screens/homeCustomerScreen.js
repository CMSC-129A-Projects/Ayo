import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native'
import {useSelector} from 'react-redux';

import {HomeScreenButtons} from '../components/index';
import {icons} from '../constants/icons'
import { getSelectLogin } from '../redux/Users/selectors';
import {getSelectSignup} from '../redux/Users/selectors';
import {getUser} from '../redux/Users/selectors';
    
export default function homeScreen({navigation}) {
      return (
            <SafeAreaView style = {styles.Container}>
                  <ImageBackground source={require('../backgrounds/AyoHomeBG.png')} style={styles.Background}/>
                  <View style = {styles.MenuContainer}>
                        <View style = {styles.TopContainer}>
                              <TouchableOpacity style = {styles.UserDetails}>
                              <Image style = {styles.Icon} source = {require('../assets/icon.png')}></Image>
                              <View style = {styles.UserTextContainer}>
                                    <Text style = {styles.UserText}>Robert A. Johnson</Text>
                                    <Text style = {styles.UserText}>CUSTOMER</Text>
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity style = {styles.NotificationsContainer}>
                                    <Image style = {styles.NotificationIcon} source = {require('../assets/icon.png')}></Image>
                              </TouchableOpacity>
                        </View>
                        <View style = {styles.barGraphic}/>
                        <HomeScreenButtons buttonVals={[
                              {title: "View Products", img:icons.homeScreenButton1, screen:"Product List"},
                              {title: "View Prescriptions", img:icons.homeScreenButton1, screen:"Prescription List"},
                              {title: "View Basket", img:icons.homeScreenButton1, screen:"Basket Screen"}
                        ]}/>
                        <HomeScreenButtons buttonVals={[
                              {title: "", img:icons.homeScreenButton1, screen:"My Basket"},
                              {title: "", img:icons.homeScreenButton1, screen: "CardListScreen" },
                              {title: "Options", img:icons.homeScreenButton1 }
                        ]}/>
                  </View>
                 
            </SafeAreaView>

      )
}

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
            MenuContainer: {
                  height: '80%',
                  width: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 0
            },
            UserDetails: {
                  width: '70%',
                  flexDirection: 'row',
                  alignItems: 'center',
            },
            Icon: {
                  width: 50,
                  height: 50,
                  marginHorizontal: '3%',
                  marginLeft: '7%'
            },
            NotificationIcon: {
                  width: 50,
                  height: 50,
            },
            TopContainer: {
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent:'space-between',
                  right: 0
            },
            NotificationsContainer: {
                  marginRight: '7%'

            },
            UserText: {
                  color: '#ffffff',
                  fontSize: 17,
                  letterSpacing: 1,
                  fontFamily: 'Roboto',
                  fontWeight: 'bold'
            },
            barGraphic: {
                  width: '90%',
                  height: '1%',
                  marginVertical: '5%',
                  borderRadius: 20,
                  backgroundColor: '#ffffff',
                  alignSelf: 'center'
            }
      }
)

