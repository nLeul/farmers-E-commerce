import React from 'react';
import { View, Text,Alert, Modal, StyleSheet, TouchableHighlight, Button} from 'react-native';
const Logout = () => {
    return (
        <View>
            <Text>Are you sure you want to Log Out?</Text>
            <Button title="Yes"></Button>
            <Button title="Keep Shopping"></Button>
        </View>
    );
}

export default Logout;

const styles = StyleSheet.create({
    text:{

    },
    button: {
        
    }
});
