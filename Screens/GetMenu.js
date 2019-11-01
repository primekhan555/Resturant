import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Picker } from 'react-native';
import CheckBox from 'react-native-check-box';

class FlatListItem extends Component {
    state = {
        count: 0,
        isChecked:false,
    }
    render() {
        return (
            <View style={{
                flex: 1,
                height: 140,
                width: "90%",
                backgroundColor: 'gray',
                marginLeft: 10,
                marginTop: 5,
                marginRight: 10,
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 5
            }}>
                <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => {
                        this.setState({
                            isChecked: !this.state.isChecked
                        })
                    }}
                    isChecked={this.state.isChecked}
                    leftText={"CheckBox"}
                />
                <View style={styles.generalStyle}>
                    <Text>Item Name</Text>
                    <Text style={styles.TextStyle}>{this.props.item.item_name}</Text>
                </View>
                <View style={styles.generalStyle}>
                    <Text>Item Price</Text>
                    <Text style={styles.TextStyle}>{this.props.item.price}</Text>
                </View>
                <View style={styles.generalStyle}>
                    <Text>Item description</Text>
                    <Text style={styles.TextStyle}>{this.props.item.description}</Text>
                </View>

                <Text style={styles.TextStyle}>{this.props.item.presence}</Text>
                <Text>how Much you want</Text><Picker
                    selectedValue={this.state.count}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ count: itemValue })
                    }>
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="01" value="01" />
                    <Picker.Item label="02" value="02" />
                    <Picker.Item label="03" value="03" />
                    <Picker.Item label="04" value="04" />
                    <Picker.Item label="05" value="05" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="07" value="07" />
                    <Picker.Item label="08" value="08" />
                    <Picker.Item label="09" value="09" />
                    <Picker.Item label="10" value="10" />
                </Picker>

            </View>
        );
    }
}

export default class GetMenu extends Component {
    state = {
        datasource: [],
        loading: true,
    }

    componentDidMount() {
        return fetch('https://a4083d5a.ngrok.io//ihsan/Final%20Project/htdocs/index.php')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    datasource: responseJson,
                    loading: false
                })
                console.log(responseJson[0].item);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        if (this.state.isloading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#e3dede' }}>
                    <FlatList
                        data={this.state.datasource}
                        renderItem={({ item, index }) => {

                            if (item.hotel_id == 2) {
                                return (
                                    <FlatListItem item={item} index={index.toString()} />

                                )
                            }

                        }}
                        keyExtractor={(value, index) => index.toString()} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    TextStyle: {
        color: 'white'
    },
    generalStyle:{
        flexDirection:'row'
    }
})