import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';

import { 
        loginScreen, 
        signupScreen, 
        roleSelectScreen, 
        confirmationScreen,
        homeScreen,
        customerProductListScreen,
        staffProductListScreen, 
        apiTestScreen,
        /* viewMedItemsScreen,*/
        medItemScreen,
        testingscreen,
        customerVerificationScreen,
      basketScreen,} from './src/screens/index';
import store from './src/store';

import VerifiedModal from './src/modals/VerifiedModal';
import RejectModal from './src/modals/RejectModal';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName= "Log In">
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:'#009387',
          },
          headerTintColor:'#ffffff',
          headerTitleStyle:{
            fontWeight:'bold',
          }
        }}>
          {/* <Stack.Screen name ="Testing Screen" component = {testingscreen}/> */}
          <Stack.Screen options={{headerShown: false}} name="Homes" component={homeScreen} />

          <Stack.Screen options={{headerShown: false}} name="Api" component={apiTestScreen} />
          <Stack.Screen options={{headerShown: false}} name="Log In" component={loginScreen} />
          <Stack.Screen options={{headerShown: false}} name="Sign Up" component={signupScreen} />
          <Stack.Screen options={{headerShown: false}} name="Select Role" component={roleSelectScreen} />
          {/*<Stack.Screen options={{headerShown: false}} name="Verify Customers" component={customerVerificationScreen} />*/}
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Verify Customers" component={confirmationScreen} />
          {/* <Stack.Screen options={{headerShown: false}} name="Confirm" component={confirmationScreen} /> */}
          <Stack.Screen options={{headerShown: false}} name="Verify" component={VerifiedModal} />
          <Stack.Screen options={{headerShown: false}} name="Reject" component={RejectModal} />
          

          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Product List" component={customerProductListScreen} />
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Staff Product List" component={staffProductListScreen} />
          <Stack.Screen options={{headerStatusBarHeight: 30}} name="Medicine Basket" component={basketScreen} />
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
