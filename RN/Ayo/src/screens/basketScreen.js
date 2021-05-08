import React, {useState} from 'react';
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
        ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewProductDetails from '../modals/viewProductDetails'
import AddProductFail from '../modals/addProductFail'
import AddProductSuccess from '../modals/addProductSuccess'
import {Fontisto} from '@expo/vector-icons';

var tmpProducts = [
    {
        name: "biogesic",
        description: "biogesic",
        price: 10,
        //in_stock: true , 
        product_img: require("../assets/favicon.png")
    },
    {
        name: "bioflu",
        description: "bioflue",
        price: 15,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
    {
        name: "maryjane",
        description: "maryjane",
        price: 100,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "paracetamol",
        description: "paracetamol",
        price: 20,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "mefenamic",
        description: "mefenamic",
        price: 25,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
      {
        name: "alaxan",
        description: "alaxan",
        price: 10,
        //in_stock: true ,
        product_img: require("../assets/favicon.png")
    },
    {
      name: "extrajoss",
      description: "extrajoss",
        price: 1,
        //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
    name: "elixir",
    description: "elixir",
    price: 200,
    //in_stock: true ,
    product_img: require("../assets/favicon.png")
  }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.itemText, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
const basketList = () => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [failVisible, setFailVisible] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [name, setname] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
        const color = item.name === selectedId ? 'white' : 'black';
        return (
            <View style={styles.touchablesContainer}>
            <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
                setItemData(item);
                setModalVisible(!modalVisible); 
                
            }}>
                <View>
                    <Text style = {styles.productPreviewText}>{item.name}</Text>
                    <Text style = {styles.productPreviewText}>Price: ₱{item.price}</Text>
                </View>
                <Image source={item.product_img}
                    style={styles.productPreviewImage}
                />
            </TouchableOpacity>
            </View>
        );
    };

    return(
        <SafeAreaView style= {styles.Container}>
            <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
            <View style = {styles.ContentContainer}>
                <SafeAreaView style = {styles.ListContainer}>
                    <FlatList data={tmpProducts}
                            renderItem={renderItem}
                            keyExtractor={item => item.description}
                    />
                </SafeAreaView>
            </View>
        </SafeAreaView>
    );
}

export default basketList;

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
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            position: 'absolute',
        },
        ListContainer:{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(100, 100, 100, 0.5)',
            alignSelf: 'center',
            justifyContent: 'center',
        },
        touchablesContainer: {
            alignSelf:'center',
            width: '95%',
            margin: '1.5%',
            borderRadius: 15,
            backgroundColor: 'white',
        },
        touchables: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        productPreviewText: {
            fontSize: 18,
            fontFamily: 'Roboto',
        },
        productPreviewImage: {
            width:80, 
            height:80, 
            marginVertical: '5%'
        },
        item: {
            padding: '2.7%',
            borderWidth: 2,
            borderColor: '#ffffff',
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
        },
    }   
)