import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default class OptionScreen extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        fetch('https://a4083d5a.ngrok.io/hello/post.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                item: 'sandwich',
                            }),
                        });
                    }}
                >
                    <Text style={{ fontSize: 20 }}>click me</Text>
                </TouchableOpacity>

            </View>
        );
    }
}