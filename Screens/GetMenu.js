import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Picker
} from 'react-native';

class FlatListItem extends Component {
    state = {
        isChecked: false,
        c_id: this.props.c_id,
        hello: [],
        buttonState: false,
        btnBackColor: 'white',
        btnText: 'red',
        picker: true,
        count: 1
    }
    _handleClick(item_id, c_id, hotel_id, item_name, count) {
        this.props.updateState(item_id, c_id, hotel_id, item_name, count);
    }
    render() {
        return (
            <View
                style={styles.FlatListItem}>
                <View style={styles.generalStyle}>
                    <Text style={[styles.generalText, styles.name]}>Name </Text>
                    <Text style={styles.TextStyle}>{this.props.item.item_name}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={[styles.generalStyle]}>
                    <Text style={[styles.generalText, styles.price]}>Price</Text>
                    <Text style={styles.TextStyle}>{this.props.item.price}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={[styles.generalStyle]}>
                    <Text style={[styles.generalText, styles.description]}>Description</Text>
                    <Text style={styles.TextStyle}>{this.props.item.description}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Picker
                        enabled={this.state.picker}
                        selectedValue={this.state.count}
                        style={{ height: 30, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                                count: itemValue
                            })
                        }}>
                        <Picker.Item label="01" value="1" />
                        <Picker.Item label="02" value="2" />
                        <Picker.Item label="03" value="3" />
                        <Picker.Item label="04" value="4" />
                        <Picker.Item label="05" value="5" />

                    </Picker>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                buttonState: true,
                                btnBackColor: 'red',
                                btnText: 'white',
                                picker: false,
                            })
                            let item_id = this.props.item.item_id.toString();
                            let c_id = this.props.c_id.toString();
                            let hotel_id = this.props.item.hotel_id.toString();
                            let item_name = this.props.item.item_name.toString();
                            let count = this.state.count.toString();

                            this._handleClick(item_id, c_id, hotel_id, item_name, count);
                        }}
                        disabled={this.state.buttonState}
                        style={{
                            backgroundColor: this.state.btnBackColor,
                            width: 100,
                            height: 30,
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderRadius: 10
                        }}>
                        <Text style={{
                            alignSelf: 'center',
                            color: this.state.btnText,
                            fontWeight: 'bold'
                        }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default class GetMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datasource: [],
            loading: true,
            hotel_id: null,
            name: '',
            email: '',
            address: '',
            c_id: null,
            count: 0,
            arr: []
        }
    }

    updateState = (item_id, c_id, hotel_id, item_name, count) => {
        var newarr = this.state.arr;
        var obj = {};
        obj["item_id"] = item_id;
        obj["c_id"] = c_id;
        obj["hotel_id"] = hotel_id;
        obj["item_name"] = item_name;
        obj["count"] = count;
        newarr.push(obj);
        this.setState({
            arr: newarr,
            count: this.state.count + 1
        });
    }
    componentDidMount() {
        AsyncStorage.getItem('name', (err, result) => {
            if (result !== null) {
                this.setState({
                    name: result,
                })
            }
        })
            .then(() => {
                AsyncStorage.getItem('email', (err, result) => {
                    if (result !== null) {
                        this.setState({
                            email: result,
                        })
                    }
                })
            })
            .then(() => {
                AsyncStorage.getItem('address', (err, result) => {
                    if (result !== null) {
                        this.setState({
                            address: result,
                        })
                    }
                })
            })
            .then(() => {
                fetch('https://1c1252df.ngrok.io/final_Project/htdocs/clientGet.php')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        for (var i = 0; i < responseJson.length; i++) {
                            if (this.state.name == responseJson[i].c_name && this.state.email == responseJson[i].c_email) {
                                this.setState({
                                    c_id: responseJson[i].c_id
                                })
                            }
                        }
                    })
            })
        AsyncStorage.getItem('hotel_id', (err, result) => {
            if (result !== null) {
                this.setState({
                    hotel_id: result,
                })
            }
        })
            .then(() => {
                fetch('https://1c1252df.ngrok.io//final_Project/htdocs/index.php')
                    .then((response) => response.json())
                    .then((responseJson) => {

                        this.setState({
                            datasource: responseJson,
                            loading: false
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });
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
            var c_id = this.state.c_id;
            return (
                <View style={{
                    flex: 1
                }}>
                    <View style={{ flex: 9, backgroundColor: '#e3dede' }}>
                        <FlatList
                            data={this.state.datasource}
                            renderItem={({ item, index }) => {

                                if (item.hotel_id == this.state.hotel_id) {
                                    return (
                                        <FlatListItem
                                            item={item}
                                            index={index.toString()}
                                            c_id={c_id}
                                            updateState={this.updateState} />
                                    )
                                }
                            }}
                            keyExtractor={(value, index) => index.toString()} />
                    </View>
                    <View style={styles.orderView}>
                        <TouchableOpacity
                            onPress={() => {
                                var orderArray = this.state.arr;
                                AsyncStorage.setItem('orderList', JSON.stringify(orderArray), () => {
                                    this.props.navigation.navigate('OrderListScreen');
                                })
                            }}
                            style={styles.orderOpacity}>
                            <Text style={styles.orderText}>order</Text>
                        </TouchableOpacity>
                        <View style={styles.countView}>
                            <Text style={styles.countText}>{this.state.count}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    TextStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    generalStyle: {
        flexDirection: 'row'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
    name: {
        marginRight: 100,
    },
    price: {
        marginRight: 170
    },
    description: {
        marginRight: 40
    },
    presence: {
        marginRight: 150
    },
    checkBox: {
        width: 180,
    },

    orderView: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
    },
    orderOpacity: {
        backgroundColor: 'lightgreen',
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 58,
        marginTop: 2,
        marginLeft: 2
    },
    orderText: {
        color: 'brown',
        fontWeight: 'bold',
        fontSize: 16
    },
    countView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        flex: 1,
        borderRadius: 10,
        margin: 2
    },
    countText: {
        color: 'brown',
        fontSize: 30
    },
    FlatListItem: {
        flex: 1,
        height: 120,
        width: "90%",
        backgroundColor: 'lightgreen',
        marginLeft: 10,
        marginTop: 5,
        marginRight: 10,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
})