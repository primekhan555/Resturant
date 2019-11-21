import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class QRCodeScanner extends Component {
    static navigationOptions={
        headerTitleStyle:{
            marginLeft:80
        },  
        title:'Scan Menu Code',
        headerLeft:null
    }
    constructor(props) {
        super(props);
        this.state = {
            qrvalue: '',
            openScanner: false,
            dataSource: '',
            isLoading: true,
            CNIC: '',
        };
    }
    afterCodeScaning(qrvalues) {
        this.setState({
            qrvalue: qrvalues,
            openScanner: false,
        })
        var plainText = qrvalues;
        console.log(plainText)
        var halfText = plainText.split('#');
        let hotel_id=halfText[1];
        if (halfText[3] == "GetMenu") {
            AsyncStorage.setItem('hotel_id', hotel_id, ()=>{
                this.props.navigation.navigate('GetMenu');
            })
        }
        else {
            ToastAndroid.showWithGravity('your code is not valid, please try a valid one',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER);
        }
    }
    openScanner() {
        var that = this;
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'App Camera Permission',
                        'message': 'App needs access to your camera '
                    })
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        that.setState({
                            qrvalue: '',
                            openScanner: true,
                        });
                    }
                    else {
                        alert("CAMERA permission denied");
                    }
                }
                catch (err) {
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            requestCameraPermission();
        }
        else {
            that.setState({
                qrvalue: '',
                openScanner: true,
            });
        }
    }
    render() {

        if (!this.state.openScanner) {
            this.openScanner();
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            );
        }

        return (
            <View style={{ flex: 1,}}>
                <View style={styles.container}>
                    <CameraKitCameraScreen
                        showFrame={true}
                        heightForScannerFrame={1000}
                        offsetForScannerFrame={10}
                        scanBarcode={true}
                        laserColor={'green'}
                        frameColor={'red'}
                        colorForScannerFrame={'black'}
                        onReadCode={event =>
                            this.afterCodeScaning(event.nativeEvent.codeStringValue)
                        }
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 150,
        marginTop: -50,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

});