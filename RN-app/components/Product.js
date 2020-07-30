import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView,Image, ActivityIndicator, Alert } from 'react-native';
import StateContext from '../StateContext';





const Product = ({ data }) => {

    const { user } = useContext(StateContext);
    const customerId = user.user._id;

    const navigation = useNavigation();

    const addToCart = async (productId) => {
        try {
            const url = `https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/${customerId}/products/${productId}/cart/1`
            const cartRes = await axios.patch(url);
            Alert.alert("you have added one product");
        }
        catch (err) {
            console.log(err);
        }

    };


    const { _id, index, productName, quantity, productPrice, productDescription, productImage } = data;

    return (
        <ScrollView>

            <View
                style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}
            >

   <View style={styles.row}>
                    {/* <View>
                    <Text>{_id}</Text>
                </View> */}
                    <View style={styles.cover}>
                        <Text>{productName}</Text>
                        <Text style={styles.faculty}>{productName} - {productPrice}</Text>
                    </View>
                    <View style={styles.cover}>
                        <Text>{quantity}</Text>
                    </View>
                    <View>
                        <Text></Text>
                    </View>
                    <View>
                        <Text>{productDescription}</Text>
                    </View>
                    <View>
                        <Image
                            style={styles.logo}
                            source={{
                                uri:productImage,
                            }}
                        />
                    </View>

                    <View style={styles.edges}>
                        <TouchableHighlight
                            onPress={() => addToCart(_id)}
                            style={styles.button}
                            underlayColor="#5398DC">
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        </ScrollView>
  
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      logo: {
        width: 66,
        height: 58,
      },
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
    stars: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        minWidth: 50,
    },
    cover: {
        flexDirection: 'column',
        flex: 8,
    },
    faculty: {
        color: 'grey',
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
    },
    info: {
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});

export default Product;

