import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';

import {splashScreen,
        apiTestScreen, 
        loginScreen, 
        signupScreen, 
        roleSelectScreen, 
        confirmationScreen,
        customerProductListScreen,
        staffProductListScreen, 
        medItemScreen,
        customerTabScreen,
        pharmacyTabScreen,
        ownerTabScreen,
        staffOrderListScreen} from './src/screens/index';
import store from './src/store';

import VerifiedModal from './src/modals/VerifiedModal';
import RejectModal from './src/modals/RejectModal';
import cardListScreen from './src/screens/cardListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName= "Splash Screen">
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:'#009387',
          },
          headerTintColor:'#ffffff',
          headerTitleStyle:{
            fontWeight:'bold',
          }
        }}>
          <Stack.Screen options={{headerShown: false}} name ="Order List Screen" component = {staffOrderListScreen}/> 
          <Stack.Screen options={{headerShown: false}} name ="Splash Screen" component = {splashScreen}/> 
          <Stack.Screen options={{headerShown: false}} name="Log In" component={loginScreen} />
          <Stack.Screen options={{headerShown: false}} name="Sign Up" component={signupScreen} />
          <Stack.Screen options={{headerShown: false}} name="Select Role" component={roleSelectScreen} />
          {/*<Stack.Screen options={{headerShown: false}} name="Verify Customers" component={customerVerificationScreen} />*/}
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Verify Customers" component={confirmationScreen} />
          {/* <Stack.Screen options={{headerShown: false}} name="Confirm" component={confirmationScreen} /> */}
          <Stack.Screen options={{headerShown: false}} name="Verify" component={VerifiedModal} />
          <Stack.Screen options={{headerShown: false}} name="Reject" component={RejectModal} />
          <Stack.Screen options={{headerShown: false}} name="Customer Homes" component={customerTabScreen} />
          <Stack.Screen options={{headerShown: false}} name="Pharmacy Homes" component={pharmacyTabScreen} />
          <Stack.Screen options={{headerShown: false}} name="Owner Homes" component={ownerTabScreen} />
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Product List" component={customerProductListScreen} />
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Staff Product List" component={staffProductListScreen} />
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="My Basket" component={cardListScreen} />
          
                    <Stack.Screen name="Api" component={apiTestScreen} />

          {/*<Stack.Screen name="ViewMedItems" component={viewMedItemsScreen} />*/}
          <Stack.Screen name="MedItems" component={medItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
