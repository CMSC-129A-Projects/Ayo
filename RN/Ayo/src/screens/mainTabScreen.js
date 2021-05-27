import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

import homeScreen from './homeScreen';
import customerProductListScreen from './customerProductListScreen';
import basketScreen from './basketScreen';
import profileScreen from './profileScreen';
import notificationScreen from './notificationScreen';

       const HomeStack = createStackNavigator();
       const ProductsStack = createStackNavigator();
       const BasketStack = createStackNavigator();
       const ProfileStack = createStackNavigator();
       const NotificationStack = createStackNavigator();
       const Tab = createMaterialBottomTabNavigator();
       
       const MainTabScreen = () => (
           <Tab.Navigator
             initialRouteName="Home"
             activeColor="#fff"
           >
             <Tab.Screen
               name="Home"
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
                 tabBarColor: '#1f65ff',
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
                 tabBarColor: '#ff3333',
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
                 tabBarColor: '#00E8B5',
                 tabBarIcon: ({ color }) => (
                    <Entypo name="shopping-basket" color={color} size={26} />
                 ),
               }}
             />
             <Tab.Screen
               name="Profile"
               component={profileScreen}
               options={{
                 tabBarLabel: 'Profile',
                 tabBarColor: '#FF6347',
                 tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                 ),
               }}
             />
           </Tab.Navigator>
       );
       
       export default MainTabScreen;
       
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
               <HomeStack.Screen name="Home" component={homeScreen} options={{
               title:'Welcome User!',
               headerLeft: () => (
                   <Entypo.Button name="menu" size={25} backgroundColor="#06AD91" onPress={() => navigation.goBack()}></Entypo.Button>
               )
               }} />
       </HomeStack.Navigator>
       );
       
       const ProductsStackScreen = ({navigation}) => (
       <ProductsStack.Navigator screenOptions={{
               headerStyle: {
               backgroundColor: '#1f65ff',
               },
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold'
               }
           }}>
               <ProductsStack.Screen name="Products" component={customerProductListScreen} options={{
               headerLeft: () => (
                <Ionicons.Button name="arrow-back-circle-outline" size={35} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Ionicons.Button>
               )
               }} />
       </ProductsStack.Navigator>
       );
       const NotificationStackScreen = ({navigation}) => (
        <NotificationStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#ff3333',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <NotificationStack.Screen name="My Notifications" component={notificationScreen} options={{
                headerLeft: () => (
                 <Ionicons.Button name="arrow-back-circle-outline" size={35} backgroundColor="#ff3333" onPress={() => navigation.goBack()}></Ionicons.Button>
                )
                }} />
        </NotificationStack.Navigator>
        );
       const BasketStackScreen = ({navigation}) => (
        <BasketStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: '#00E8B5',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <BasketStack.Screen name="My Basket" component={basketScreen} options={{
                headerLeft: () => (
                 <Ionicons.Button name="arrow-back-circle-outline" size={35} backgroundColor="#00E8B5" onPress={() => navigation.goBack()}></Ionicons.Button>
                )
                }} />
        </BasketStack.Navigator>
        );
