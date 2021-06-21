import React, {useState, useEffect} from 'react';
import {StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground, 
    SafeAreaView,
    Modal,
    Image,
    FlatList,
    Platform,
    TouchableHighlight,
    Button,
    ScrollView,
    Dimensions,
    StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const addGeneric = () => {
    const navigation = useNavigation(); 
    const [enteredDisease, setEnteredDisease] = useState('');
    const [diseasesList, setDiseasesList] = useState([]);


    return (
        <SafeAreaView style= {styles.Container}>
            <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
            <View style = {styles.ContentContainer}>
                <View style = {styles.addProductDetailsContainer}>
                    <View style = {styles.addProductDetailsTopField}>
                        <View style= {styles.addGenericDetailsField}>
                            <Text style={styles.addGenericTitleText}>
                            ADD GENERIC MEDICINE
                            </Text>
                            <TextInput
                            placeholder = "Generic Name"
                            placeholderTextColor = '#ababab'
                            underlineColorAndroid = "transparent"
                            style = {styles.inputField}
                            />
                        </View>
                    </View>
                    <TextInput
                    placeholder = "Add Disease"
                    placeholderTextColor = '#ababab'
                    underlineColorAndroid = "transparent"
                    style = {styles.inputDiseaseField}
                    onChangeText = {enteredText => setEnteredDisease(enteredText)}
                    value = {enteredDisease}
                    />
                    <TouchableOpacity style = {styles.addDiseaseButton}
                                    onPress = {() => setDiseasesList(diseasesList => [...diseasesList, enteredDisease])}>
                    <Text style = {styles.addDiseaseButtonText}>
                        ADD DISEASE
                    </Text>
                    </TouchableOpacity>
              </View>
              <SafeAreaView style = {styles.ListContainer}>
                <FlatList data = {diseasesList.reverse()} 
                          renderItem = {diseaseData => <View style = {styles.itemView}><Text style = {styles.itemText}>{diseaseData.item}</Text></View>}
                          ListEmptyComponent = {<Text style = {styles.placeholderText}>DISEASES LIST</Text>}
                          //keyExtractor={diseasesList => {diseasesList.item}}
                          />
              </SafeAreaView>
              <TouchableOpacity style = {styles.addProductButton}
                                    onPress = {() => {
                                    navigation.navigate("Add Product");
                                    }}>
                    <Text style = {styles.addProductButtonText}>
                        ADD GENERIC NAME
                    </Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default addGeneric;

const styles = StyleSheet.create(
  {
    Container: {
      flex:1  
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
      backgroundColor: 'rgba(100, 100, 100, 0.3)',
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      position: 'absolute',
    },
    addProductDetailsContainer: {
      justifyContent: 'center'
    },
    addProductDetailsTopField: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    addProductDetailsField: {
      width: '50%',
      marginLeft: '5%',
      justifyContent: 'flex-end'
    },
    addGenericDetailsField: {
      width: '93%',
      justifyContent: 'center'
    },
    addGenericTitleText: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      letterSpacing: 0.3,
      alignSelf: 'center',
      marginBottom: '5%',
      color: '#ffffff',
    },
    addDiseaseButton: {
      flex: 0,
      borderWidth: 3,
      borderColor: '#ffffff',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '4%',
      padding: '2%',
      },
      addDiseaseButtonText: {
      color: '#ffffff',
      fontSize: 18,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
      },
    addProductButton: {
    flex: 0,
    borderWidth: 3,
    borderColor: '#00d1a3',
    backgroundColor:  '#00d1a3',
    borderRadius: 23,
    width: '70%',
    alignSelf:'center',
    alignItems:'center',
    margin: '4%',
    padding: '2%',
    },
    addProductButtonText: {
    color: '#ffffff',
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
    },
    inputField: {
        width: '100%',
        padding: '1%',
        borderRadius: 15,
        borderWidth: 0.75,
        borderColor: 'black',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
        margin: "3.5%",
        alignSelf:'center'
    },
    inputDiseaseField:{
        width: '93%',
        padding: '1%',
        height: '23%',
        borderRadius: 15,
        borderWidth: 0.75,
        backgroundColor: '#ffffff',
        borderColor: 'black',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
        marginTop: '1%',
        alignSelf:'center'
      },
      ListContainer:{
        width: '90%',
        flex: 1,
        borderWidth: 4,
        borderRadius: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      itemText:{
        color: '#565656',
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      placeholderText:{
        color: '#ababab',
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      itemView: {
        alignSelf: 'center',
        marginVertical:'0.5%',
      },
  }
)
