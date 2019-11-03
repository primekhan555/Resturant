import React,{Component  } from "react";
import {View, Text , TextInput, TouchableOpacity, StyleSheet,AsyncStorage  } from "react-native";
export default class OptionScreen extends Component{
    state={
        name:'',
        email:'',
        address:''
    }
    render(){   
        return(
            <View style={styles.mainView}>
                <View style={styles.inputView}>
                    <Text style={styles.headText}>Name</Text>
                    <TextInput
                    placeholder="your name"
                    placeholderTextColor='gray'
                    underlineColorAndroid="gray"
                    onChangeText={(value)=>{
                        this.setState({
                            name:value
                        })
                    }}
                     />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.headText}>Email</Text>
                    <TextInput
                    placeholder="your Email"
                    placeholderTextColor='gray'
                    underlineColorAndroid="gray"
                    onChangeText={(value)=>{
                        this.setState({
                            email:value
                        })
                    }}
                     />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.headText}>Address</Text>
                    <TextInput
                    placeholder="your Address"
                    placeholderTextColor='gray'
                    underlineColorAndroid="gray"
                    onChangeText={(value)=>{
                        this.setState({
                            address:value
                        })
                    }}
                     />
                </View>
                <View style={styles.opacityView}>
                    <TouchableOpacity
                    onPress={()=>{
                        fetch('https://a4083d5a.ngrok.io/ihsan/Final%20Project/htdocs/clientPost.php', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                c_name: this.state.name,
                                c_email:this.state.email,
                                c_address:this.state.address,
                            }),
                        })
                        .then(()=>{
                            let name=this.state.name;
                            let email=this.state.email;
                            let address=this.state.address;
                            AsyncStorage.setItem('name', name,()=>{
                                AsyncStorage.setItem('email',email, ()=>{
                                    AsyncStorage.setItem('address',address, ()=>{
                                        this.props.navigation.navigate('GetMenu')
                                    });
                                });

                            });
                            
                        });
                        // .then(()=>{
                            
                        // });
                    }}
                    style={styles.opacity}>
                        <Text style={styles.opacityText}
                        >Register</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:'#e3bce6',
        
    },
    inputView:{
        width:"90%",
        alignSelf:'center',
        marginTop:20
    },
    opacityView:{
        alignSelf:'center',
        height:35,
        width:120,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
    },
    opacity:{
        backgroundColor:'white',
        height:35,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    opacityText:{
        color:'#474247',
        fontSize:16,
        fontWeight:'bold'
    },
    headText:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    }
})