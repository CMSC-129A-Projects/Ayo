import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

import homeCustomerScreen from './homeCustomerScreen';
import customerProductListScreen from './customerProductListScreen';
import profileScreen from './profileScreen';
import notificationScreen from './notificationScreen';
import editProfileScreen from './editProfileScreen';
import basketListScreen from './basketListScreen';
import basketItemDetails from './basketItemDetails';
import checkoutScreen from './checkoutScreen';

       const HomeStack = createStackNavigator();
       const ProductsStack = createStackNavigator();
       const BasketStack = createStackNavigator();
       const ProfileStack = createStackNavigator();
       const NotificationStack = createStackNavigator();
       const Tab = createMaterialBottomTabNavigator();
       
       const customerTabScreen = () => (
           <Tab.Navigator
             initialRouteName="Home Customer"
             activeColor="#fff"
           >
             <Tab.Screen
               name="Home Customer"
               component={HomeStackScreen}
               options={{
                 tabBarLabel: 'Home',
                 tabBarColor: '#06AD91',
                 tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                 ),
               }}
             />
             <Tab.Screen
               name="Products"
               component={ProductsStackScreen}
               options={{
                 tabBarLabel: 'Products',
                 tabBarColor: '#00ccaa',
                 tabBarIcon: ({ color }) => (
                    <AntDesign name="medicinebox" color={color} size={24}/>
                 ),
               }}
             />
            <Tab.Screen
               name="Notifications"
               component={NotificationStackScreen}
               options={{
                 tabBarLabel: 'Notifications',
                 tabBarColor: '#06AD91',
                 tabBarIcon: ({ color }) => (
                    <Ionicons name="notifications" color={color} size={24}/>
                 ),
               }}
             />
             <Tab.Screen
               name="Basket"
               component={BasketStackScreen}
               options={{
                 tabBarLabel: 'Basket',
                 tabBarColor: '#00ccaa',
                 tabBarIcon: ({ color }) => (
                    <Entypo name="shopping-basket" color={color} size={26} />
                 ),
               }}
             />
             <Tab.Screen
               name="Profile"
               component={ProfileStackScreen}
               options={{
                 tabBarLabel: 'Profile',
                 tabBarColor: '#06AD91',
                 tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                 ),
               }}
             />
           </Tab.Navigator>
       );
       
       export default customerTabScreen;
       
       const HomeStackScreen = ({navigation}) => (
       <HomeStack.Navigator screenOptions={{
               headerStyle: {
               backgroundColor: '#06AD91',
               },
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold'
               }
           }}>
               <HomeStack.Screen
                name="Home Customer" 
                component={homeCustomerScreen}
                options ={{headerShown:false}} 
                />
              
       </HomeStack.Navigator>
       );
       
       const ProductsStackScreen = ({navigation}) => (
       <ProductsStack.Navigator screenOptions={{
               headerStyle: {
               backgroundColor: '#00ccaa',
               },
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold'
               }
           }}>
               <ProductsStack.Screen name="Products" component={customerProductListScreen} options={{
               headerLeft: () => (
                <Ionicons.Button name="arrow-back-circle-outline" size={35} backgroundColor="#00ccaa" onPress={() => navigation.goBack()}></Ionicons.Button>
               )
               }} />
       </ProductsStack.Navigator>
       );
       const NotificationStackScreen = ({navigation}) => (
        <NotificationStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#06AD91',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                }
            }}>
                <NotificationStack.Screen name="My Notifications" component={notificationScreen} options={{
                headerLeft: () => (
                 <Ionicons.Button name="arrow-back-circle-outline" size={35} backgroundColor="#06AD91" onPress={() => navigation.goBack()}></Ionicons.Button>
                )
                }} />
        </NotificationStack.Navigator>
        );
       const BasketStackScreen = ({navigation}) => (
        <BasketStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#00ccaa',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <BasketStack.Screen 
                name="Basket Screen"
                component={basketListScreen}
                options={({route}) => ({
                  title: 'My Basket',
                  headerBackTitleVisible: false,
                  headerLeft: () => (
                 <Ionicons.Button 
                 name="arrow-back-circle-outline" 
                 size={35} backgroundColor="#00ccaa" 
                 onPress={() => navigation.goBack()}>
                 </Ionicons.Button>
                 )
                })}/>
              <BasketStack.Screen 
                name="Basket Item Details"
                component={basketItemDetails}
                options={({route}) => ({
                  headerBackTitleVisible: false,
                  headerTitle: false,
                  headerTransparent: true,
                  headerTintColor: '#fff'
                })}
              />
              <BasketStack.Screen 
                name="Checkout"
                component={checkoutScreen}
                options={({route}) => ({
                  title: 'Checkout',
                  headerBackTitleVisible: false,
                  headerLeft: () => (
                 <Ionicons.Button 
                 name="arrow-back-circle-outline" 
                 size={35} backgroundColor="#00ccaa" 
                 onPress={() => navigation.navigate('Basket Screen')}>
                 </Ionicons.Button>
                 )
                })}/>
        </BasketStack.Navigator>
        );

        const ProfileStackScreen = ({navigation}) => {
          return (
            <ProfileStack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'white',
                  shadowColor: 'black', // iOS
                  elevation: 0, // Android
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
                }
              }}>
              <ProfileStack.Screen
                name="ProfileScreen"
                component={profileScreen}
                options={{
                  title: '',
                  headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                      <Entypo.Button 
                      name="menu" 
                      size={25}  
                      color = 'black'
                      backgroundColor = 'white'
                      onPress={() => navigation.navigate('Home Customer')}></Entypo.Button>
                    </View>
                  ),
                  headerRight: () => (
                    <View style={{marginRight: 10}}>
                      <MaterialCommunityIcons.Button
                        name="account-edit"
                        size={25}
                        color= 'black'
                        backgroundColor = 'white'
                        onPress={() => navigation.navigate('EditProfile')}
                      />
                    </View>
                  ),
                }}
              />
              <ProfileStack.Screen
                name="EditProfile"
                
                options={{
                  backgroundColor: 'grey',
                  title: 'Edit Profile',
                  headerLeft: () => (
                 <Ionicons.Button name="arrow-back-circle-outline" 
                 size={35} 
                 color = 'black'
                 backgroundColor = 'white'
                 onPress={() => navigation.navigate('ProfileScreen')}/>
                )
                }}
                component={editProfileScreen}
              />
            </ProfileStack.Navigator>
          );
        };
