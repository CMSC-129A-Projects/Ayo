import React from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import {icons} from '../constants/icons'
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';


const ProfileScreen = ({navigation, user, dispatch}) => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={
                require('../assets/favicon.png')
            }
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user.name}</Title>
            <Caption style={styles.caption}>{user.username}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="map-marker" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Cebu City, Philippines</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>09{user.contact_number}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>r_johnson@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>12</Title>
            <Caption>Prescriptions</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="credit-card-clock" color="#06AD91" size={25}/>
            <Text style={styles.menuItemText}>Summary of Records</Text>
          </View>
        </TouchableRipple>
        <View style={styles.signoutSection}>
        <TouchableRipple onPress={() => {navigation.navigate('Splash Screen')}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="logout-variant" color="#06AD91" size={25}/>
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>
        </View>

      </View>
 
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user : state.userData
})

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  signoutSection: {
    marginTop: 220,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    
}
});