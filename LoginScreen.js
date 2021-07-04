import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';



export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId: '',
            password: '',
        }
    }



    login = async(email,password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email, password);
                if(response){
                    this.props.navigation.navigate('')
                }
            }
            catch(error){
                switch (error.code){
                    case 'auth/user-not-found':
                        Alert.alert("user doesn't exist")

                        break;

                    case 'auth/invalid-password':
                        Alert.alert("enter the correct password")
                }
            }
        }
        else{
            Alert.alert("enter email and password")
        }
    }



    render(){
        return(
            <View>

                <TextInput
                    placeholder= 'abc@example.com'
                    keyboardType= 'email-address'
                    onChangeText= {(text)=>{
                        this.setState({
                            emailId: text
                        })
                    }}
                />

                <TextInput
                    secureTextEntry = {true}
                    placeholder= 'abc@example.com'
                    keyboardType= 'enter-password'
                    onChangeText= {(text)=>{
                        this.setState({
                            password: text
                        })
                    }}
                />

                <TouchableOpacity style={{ height: 30, width: 90, borderWidth: 1, marginTop: 20, paddingTop: 5, borderRadius: 5 }}
                    onPress={()=>{this.Login(this.state.emailId, this.state.password)}}>
                        <Text style={{textAlign: 'center'}}> Login </Text>
                </TouchableOpacity>

                

            </View>
        )
    }
}

