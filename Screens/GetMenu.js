import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Picker, TouchableHighlight } from 'react-native';
import CheckBox from 'react-native-check-box';

class FlatListItem extends Component {
    state = {
        count: 1,
        isChecked: false,
    }
    render() {
        return (
            <View style={{
                flex: 1,
                height: 180,
                width: "90%",
                backgroundColor: '#31bd6c',
                marginLeft: 10,
                marginTop: 5,
                marginRight: 10,
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 5
            }}>

                <View style={styles.generalStyle}>
                    <Text style={[styles.generalText, styles.name]}>Name </Text>
                    <Text style={styles.TextStyle}>{this.props.item.item_name}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={[styles.generalStyle]}>
                    <Text style={[styles.generalText,styles.price]}>Price</Text>
                    <Text style={styles.TextStyle}>{this.props.item.price}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={[styles.generalStyle]}>
                    <Text style={[styles.generalText, styles.description]}>Description</Text>
                    <Text style={styles.TextStyle}>{this.props.item.description}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={styles.generalStyle}>
                    <Text style={[styles.generalText, styles.presence]}>Presence</Text>
                    <Text style={styles.TextStyle}>{this.props.item.presence}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', width: 250 }}></View>
                <View style={[styles.generalStyle, styles.checkBox]}>
                    <CheckBox
                        style={{ flex: 1, padding: 5, width: '10%', }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                        }}
                        isChecked={this.state.isChecked}
                        leftText={"Check if you want it"}
                    />
                </View>
                <View style={[styles.generalStyle, styles.picker]}>
                    <Text style={[styles.generalText,styles.pickerText]}>how Much you want</Text>
                    <Picker
                        selectedValue={this.state.count}
                        style={{ height: 30, width: 100 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ count: itemValue })
                        }>
                        <Picker.Item label="01" value="1" />
                        <Picker.Item label="02" value="2" />
                        <Picker.Item label="03" value="3" />
                        <Picker.Item label="04" value="4" />
                        <Picker.Item label="05" value="5" />
                        {/* <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" /> */}
                    </Picker>
                </View>
                {
                    this.state.isChecked ?
                <TouchableHighlight style={{
                    backgroundColor:'white', 
                    width:100, 
                    height:30, 
                    justifyContent:'center',
                    alignContent:'center',
                    borderRadius:10
                    }}
                    onPress={()=>{
                        var d=new Date();
                        var day =d.getDate().toString().concat('-');
                        var month =d.getMonth().toString().concat('-');
                        var year =d.getFullYear().toString();
                        var dm = day.concat(month);
                        var dmy = dm.concat(year);
                        var hours = d.getHours().toString().concat(' : ');
                        var minutes = d.getMinutes().toString();
                        var hm =hours.concat(minutes);
                        // console.log(hm)
                        // console.log(dmy)
                        // console.log(this.state.count);
                        fetch('https://a4083d5a.ngrok.io/ihsan/Final%20Project/htdocs/orderPost.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                o_id: 12,
                                c_id:6,
                                hotel_id:this.props.item.hotel_id,
                                item_id:this.props.item.item_id,
                                item_amount:this.state.count,
                                date: dmy,
                                time:hm,
                                status:1,
                            }),
                        });
                    }}>
                    <Text style={{alignSelf:'center', color:'red', fontWeight:'bold'}}>Order</Text>
                </TouchableHighlight>
                :null
                    }
                

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

                            if (item.hotel_id == 3) {
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
    price:{
        marginRight:170
    },
    description:{
        marginRight:40
    },
    presence:{
        marginRight:150
    },
    checkBox:{
        width:180,
    },
    pickerText:{
        marginTop:5,
        marginRight:20
    },
    picker:{
        width:350,
        marginLeft:100,
    }
})