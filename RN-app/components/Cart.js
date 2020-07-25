import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';




const Product = ({ data }) => {

    const navigation = useNavigation();
    const pay = () => {
        //  navigation.navigate('CART');
    };

    const { _id, index, cart_items, totalPrice } = data;
    // const { prodId, quantity } = cart_items;

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}
        >
            <View style={styles.row}>
                <View>
                    <Text>{prodId}</Text>
                </View>
                <View style={styles.course}>
                    <FlatList
                        data={cart_items}
                        renderItem={(item) => (
                            <View>
                                <Text>{item.prodId}</Text>
                                <Text>{item.quantity}</Text>
                            </View>)}
                    // keyExtractor={item => item._id}

                    />
                    <Text style={styles.faculty}>{prodId} - {totalPrice}</Text>
                </View>
                <View>
                    <Text>{quantity}</Text>
                </View>
                <View>
                    <Text>{totalPrice}</Text>
                </View>

                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={pay}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Pay</Text>
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

