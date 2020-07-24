import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';



const Product = ({ data }) => {

    const navigation = useNavigation();

    const addToCart = () => {
         navigation.navigate('CART');
    };

    const {_id,index,productName, quantity, productPrice, productDescription, productImage } = data;

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}
        >
            <View style={styles.row}>
                {/* <View>
                    <Text>{_id}</Text>
                </View> */}
                <View style={styles.course}>
                    <Text>{productName}</Text>
                    <Text style={styles.faculty}>{productName} - {productPrice}</Text>
                </View>
                <View>
                    <Text>{quantity}</Text>
                </View>
                <View>
                    <Text>{productPrice}</Text>
                </View>
                <View>
                    <Text>{productDescription}</Text>
                </View>
                <View>
                    <Text>{productImage}</Text>
                </View>

                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={addToCart}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    course: {
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

