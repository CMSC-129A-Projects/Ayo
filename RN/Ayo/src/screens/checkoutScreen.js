import React, {useState, useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        SafeAreaView,
        Image,
        FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

import {Data} from '../mocks/checkoutData';
import { connect } from 'react-redux';


const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.itemText, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );
  
const basketList = ({dispatch, request_list}) => {
    const navigation = useNavigation();
    const [totalCost, setTotalCost] = useState('');
    const [totalItems, setTotalItems] = useState();

    useEffect(() => {
        getTotalCost() 
    }, []);

    const getTotalCost = () => {
        let newTotal = 0;
        let itemCt = 0;
        setTotalCost('');
        request_list.forEach(element => {
        newTotal += element.cost;
        itemCt += element.quantity;
        });
        setTotalCost(newTotal.toString())
        setTotalItems(itemCt)
        return newTotal;
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.touchables}>
                <Image source={item.product_img}
                    style={styles.productPreviewImage}
                /> 
                <View style={{marginLeft: 20, flex:1}}>
                    <Text style = {styles.productPreviewText}>{item.product_id.name}</Text>
                    <Text style = {styles.productPreviewText}>₱{item.cost / item.quantity}</Text>
                </View>
                <View style={{
                        flex: 1,
                        justifyContent:'center',
                        alignItems: 'flex-start',
                 }}>
                    <Text style = {styles.productPreviewText}>Qty: {item.quantity}</Text>
                    <Text style = {styles.productPreviewText}>Subtotal: ₱{item.cost}</Text>
                </View>
            </View>
        );
    };

    return(
        <SafeAreaView style= {styles.Container}>
            <View style = {styles.ContentContainer}>
                <SafeAreaView style = {styles.ListContainer}>
                    <FlatList 
                            showsVerticalScrollIndicator ={false}
                            data={request_list}
                            renderItem={renderItem}
                            keyExtractor={item => item.description}
                    />
                </SafeAreaView>
                <View style={styles.totalSection}>
                <View style={{flexDirection:'row', marginHorizontal: 10}}>
                <Text style= {{fontSize:22, fontWeight: 'bold'}}>Order Amount </Text>
                <Text style= {{fontSize:18}}>({totalItems} items) </Text>
                <Text style= {{fontSize:22, fontWeight: 'bold', marginLeft: 50}}> ₱{totalCost}</Text>
                </View>
                <TouchableOpacity onPress = {async () => {
                    
                }}> 
                <LinearGradient
                colors={['#00f7c1', '#00ccaa']}
                style={styles.buttonCheckout}
                >
                <Text style={{fontSize:25, fontWeight: 'bold', letterSpacing: 1, color:'#ffffff'}}>Place Order</Text>
                </LinearGradient>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    request_list : state.orderItemData.request_list
})

export default connect(mapStateToProps)(basketList);

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
            height: '80%',
            backgroundColor: '#fff',
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
            flex: 3,
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
        },
        productPreviewText: {
            fontSize: 18,
            fontFamily: 'Roboto',
        },
        productPreviewImage: {
            width:80, 
            height:80, 
            marginVertical: 15,
            marginHorizontal: 20
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
        buttonCheckout:{
            width: '70%',
            borderRadius:10,
            alignSelf:'center',
            alignItems:'center',
            marginTop: 20,
            padding: '2%',
            marginBottom: '8%',
            paddingVertical:10,
            width:'90%',
            marginHorizontal:10,
            
           },
           totalSection:{
            borderTopWidth: 1,
            borderTopColor: 'gray'
          },
    }   
)