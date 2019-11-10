import React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
export default class TestScreen2 extends React.Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        show: false,
        // text: 1,
        myArray: [],
        arr: [],
        text: "",
    };
    updateState = (inputvalue) => {
        var newValue = this.state.text;
        var newarr = this.state.arr;
        newarr.push(inputvalue);
        this.setState({
            arr: newarr,
        });
        console.log(inputvalue)
    }
    updateremove = (inputvalue) => {
        var newarr = this.state.arr;
        var pos = newarr.indexOf(inputvalue);
        newarr.splice(pos,1);
        this.setState({
            arr: newarr,
        });
        console.log(inputvalue)
    }
    _renderArr = ()=> {
        return this.state.arr.map(v => {
            return (
                // console.log(value)
                <Text key={v}
                >{v}</Text>
            )
        })
    }
    render() {
        return (
            <View >
                <Text>{this.state.text}</Text>


                <Child updateState={this.updateState} updateremove={this.updateremove} />
                {this._renderArr()}
                <Text>sdfkldfjs</Text>

            </View>
        );
    }
}

class Child extends React.Component {
    state = {
        value: ''
    }
    _handleClick(inputvalue) {
        console.log(inputvalue)
        this.props.updateState(inputvalue);

    }
    _handleremove(inputvalue) {
        console.log(inputvalue)
        this.props.updateremove(inputvalue);

    }
    
    render() {
        return (
            <View>
                <Button
                    title="click me"
                    onPress={() => {
                        var currentvalue = this.state.value.toString();
                        this._handleClick(currentvalue)
                    }} />
                    <Button
                    title="remove me"
                    onPress={() => {
                        var currentvalue = this.state.value.toString();
                        this._handleremove(currentvalue)
                    }} />
                <TextInput
                    onChangeText={(values) => this.setState({ value: values })}
                    placeholder="enter something" />
            </View>
        );
    }
}