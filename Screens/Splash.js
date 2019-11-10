import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from "react-native";
export default class Splash extends Component {
    componentDidMount() {
        AsyncStorage.getItem('name', (err, result) => {
            if (result !== null) {
                this.props.navigation.navigate('QRCodeScanner');
                this.setState({
                    cnic: result,
                })
            }
            else {
                this.props.navigation.navigate('Register');
            }
        });
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Splash</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('GetMenu');
                    }}>
                    <Text>click me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}