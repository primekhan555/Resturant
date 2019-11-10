import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid
} from 'react-native';

export default class OrderListScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        arr: [],
        fullArr: [],
        finded: [],
        count: 1,
    }
    componentDidMount() {
        AsyncStorage.getItem('orderList', (err, result) => {
            if (result !== null) {
                var parsedArr = JSON.parse(result)
                this.setState({
                    arr: parsedArr
                })
            }
        })
        AsyncStorage.getItem('fullData', (err, result) => {
            if (result !== null) {
                var parsedArr = JSON.parse(result)
                this.setState({
                    fullArr: parsedArr
                })
            }
        });
        this._renderArr();
    }
    _handleRemove(index) {
        var newarr = this.state.arr;
        var pos = newarr.indexOf(index);
        newarr.splice(pos, 1);
        this.setState({
            arr: newarr,
        });
        console.log(index)
    }
    _renderArr = () => {
        return this.state.arr.map(i => {
            return (
                <View key={i} style={{
                    backgroundColor: '#b9bdc4',
                    flexDirection: 'row',
                    width: '97%',
                    marginTop: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginLeft: 5,
                    marginEnd: 1
                }}>


                    <View style={{ marginLeft: 30, marginBottom: 30, flex: 8, marginTop: 10 }}>
                        <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.item_name}</Text>
                    </View>
                    <View style={[styles.generalStyle]}>
                        <Text style={[styles.generalText,]}>Item Count</Text>
                        <Text style={[styles.generalText,]}>{i.count}</Text>
                    </View>
                    <View style={{
                        flex: 11,
                        marginEnd: 10

                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this._handleRemove(i)
                            }}
                            style={{
                                marginLeft: 65,
                                marginTop: 10,
                                marginEnd: 50,
                                backgroundColor: 'lightblue',
                                height: 30,
                                width: 70,
                                marginEnd: 10,
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                color: '#727273',
                                fontWeight: 'bold'
                            }}>remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10, backgroundColor: 'lightgray' }}>
                    {this._renderArr()}
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => {
                            var d = new Date();
                            var day = d.getDate().toString().concat('-');
                            var mon = d.getMonth() + 1;
                            var month = mon.toString().concat('-');
                            var year = d.getFullYear().toString();
                            var dm = day.concat(month);
                            var dmy = dm.concat(year);
                            var hours = d.getHours().toString().concat(' : ');
                            var minutes = d.getMinutes().toString();
                            var hm = hours.concat(minutes);
                            for (let i = 0; i < this.state.arr.length; i++) {
                                var c_id = this.state.arr[i].c_id;
                                var count = this.state.arr[i].count;
                                var hotel_id = this.state.arr[i].hotel_id;
                                var item_id = this.state.arr[i].item_id;
                                fetch('https://ebac30bb.ngrok.io/ihsan/Final%20Project/htdocs/orderPost.php', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        o_id: 13,
                                        c_id: c_id,
                                        hotel_id: hotel_id,
                                        item_id: item_id,
                                        item_amount: count,
                                        date: dmy,
                                        time: hm,
                                        status: 1,
                                    }),
                                });
                            }
                            ToastAndroid.showWithGravity('Your Meal is Ordered Successfully',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                            this.setState({
                                arr: []
                            })
                            const resetAction = StackActions.reset({
                                index: 1,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'QRCodeScanner' }),
                                    NavigationActions.navigate({ routeName: 'GetMenu' }),
                                ],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }}
                        style={styles.orderButton}>
                        <Text style={styles.orderText}>Submit Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonView: {
        marginTop: 2,
        flex: 1,
        height: 45,
        width: "90%",
        alignSelf: 'center'
    },
    orderButton: {
        height: 45,
        backgroundColor: '#ff6666',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    orderText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    generalStyle: {
        marginLeft: 10,
        marginTop: 8,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})