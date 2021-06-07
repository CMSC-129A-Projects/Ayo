import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const notificationScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Notification Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default notificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});