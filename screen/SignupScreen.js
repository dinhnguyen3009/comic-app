import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions, TextInput, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export default class SignupScreen extends Component {
    constructor(props){
        super(props);
        this.state={txtPassword:'',txtUsername:'', txtRePassword:''};
    }
    signup = async () => {
        try {
            const username = this.state.txtUsername;
            const password = this.state.txtPassword;
            const repassword = this.state.txtRePassword;
            if(password===repassword){
                const URL = 'https://dinh-test-v1.herokuapp.com/user/signup';
                const response = await axios.post(URL, {username,password});
                if(response.data.success===true){
                alert(response.data.message)
                this.props.navigation.navigate("Signup",{user : response.data.user})
                }
                else{
                alert(response.data.message);
                }
            }
            else{
                alert('Mật khẩu không khớp')
            }
        } catch (error) {
          alert(error.message)
        }
      }
    render() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        return (
            <View style={{flex : 1,  backgroundColor:'#4267b2'}}>
            <KeyboardAwareScrollView enableOnAndroid >
            <View style={{marginTop:screenHeight*0.2,alignItems : 'center' , justifyContent : 'center'}}>
                <View style={{width : screenWidth*0.9, margin : 10}}>
                    <Text style={{fontSize:17, fontWeight:'bold'}}>Tên tài khoản</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        value={this.state.txtUsername}
                        onChangeText={text => this.setState({txtUsername : text})}
                        style={{backgroundColor : 'white' , height : 50 , padding : 10 , borderRadius : 5, marginBottom:5, marginTop:5}}
                        placeholder="Nhập tài khoản"
                    />
                    <Text style={{fontSize:17, fontWeight:'bold'}}>Mật khẩu</Text>
                    <TextInput
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        value={this.state.txtPassword}
                        onChangeText={text => this.setState({txtPassword : text})}
                        style={{backgroundColor : 'white' , height : 50 , padding : 10 , borderRadius : 5, marginBottom:5, marginTop:5}}
                        placeholder="Nhập mật khẩu"
                    />
                    <Text style={{fontSize:17, fontWeight:'bold'}}>Nhập lại mật khẩu</Text>
                    <TextInput
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        value={this.state.txtRePassword}
                        onChangeText={text => this.setState({txtRePassword : text})}
                        style={{backgroundColor : 'white' , height : 50 , padding : 10 , borderRadius : 5, marginBottom:5, marginTop:5}}
                        placeholder="Nhập lại mật khẩu"
                    />
                </View>
                <View style={{ width : screenWidth*0.9, margin:10, alignItems:'center', justifyContent:'center' }}>
                    <TouchableOpacity 
                        onPress={this.signup}
                        disabled = {this.state.txtUsername&&this.state.txtPassword&&this.state.txtRePassword?false:true}
                        style={{backgroundColor : this.state.txtUsername&&this.state.txtPassword&&this.state.txtRePassword?'#3393FD':'#B1E6F0' ,alignItems:'center', padding : 5 , borderRadius : 5, height:35, marginBottom:5,width : screenWidth*0.9}}>
                        <Text style={{ fontSize : 20 , color : 'white', fontWeight:'bold'}}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </KeyboardAwareScrollView>
            </View>
        )
      }
}
