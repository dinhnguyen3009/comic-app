import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Dimensions, TextInput, ImageBackground} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export default class SignupScreen extends Component {
    constructor(props){
        super(props);
        this.state={txtPassword:'',txtUsername:'', txtRePassword:''};
    }
    static navigationOptions =({navigation})=>({
        title: 'Đăng ký',
        headerStyle: { backgroundColor: 'black', height:screenHeight*0.07},
        headerTitleStyle: { color: 'white' },
        headerTintColor:'white'
      });
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
                this.props.navigation.navigate('Signin')
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
        return (
            <View style={{flex : 1}}>
                <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
            <KeyboardAwareScrollView enableOnAndroid >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Tên tài khoản</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        value={this.state.txtUsername}
                        onChangeText={text => this.setState({txtUsername : text})}
                        style={styles.input}
                        placeholder="Nhập tài khoản"
                    />
                    <Text style={styles.text}>Mật khẩu</Text>
                    <TextInput
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        value={this.state.txtPassword}
                        onChangeText={text => this.setState({txtPassword : text})}
                        style={styles.input}
                        placeholder="Nhập mật khẩu"
                    />
                    <Text style={styles.text}>Nhập lại mật khẩu</Text>
                    <TextInput
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        value={this.state.txtRePassword}
                        onChangeText={text => this.setState({txtRePassword : text})}
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={this.signup}
                        disabled = {this.state.txtUsername&&this.state.txtPassword&&this.state.txtRePassword?false:true}
                        style={this.state.txtUsername&&this.state.txtPassword&&this.state.txtRePassword?styles.buttonEnable:styles.buttonDisable}>
                        <Text style={styles.text}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </KeyboardAwareScrollView>
            </ImageBackground>
            </View>
        )
      }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles ={
  container:{
    alignItems : 'center',
    justifyContent : 'center',
    marginTop:screenHeight*0.2
  },
  inputContainer:{
    width : screenWidth*0.9,
    margin : screenWidth*0.015
  },
  input:{
    backgroundColor : 'white' ,
    height : screenHeight*0.08 ,
    padding : screenHeight*0.005 ,
    borderRadius : 5,
    marginBottom:screenHeight*0.0025,
    marginTop:screenHeight*0.0025
  },
  buttonContainer:{
    width : screenWidth*0.9,
    margin:screenHeight*0.005
  },
  buttonEnable:{
    backgroundColor : '#3393FD',
    alignItems:'center',
    padding : screenHeight*0.005,
    borderRadius : 5,
    height:screenHeight*0.06,
  },
  buttonDisable:{
    backgroundColor : '#B1E6F0',
    alignItems:'center',
    padding : screenHeight*0.005,
    borderRadius : 5,
    height:screenHeight*0.06,
  },
  text:{
    fontSize : screenHeight*0.03,
    color : 'white',
    fontWeight:'bold'
  },
  textNormal:{
    fontSize : screenHeight*0.02,
    color : 'white',
    margin: screenHeight*0.01
  },
  textContainer:{
    alignItems : 'center',
    justifyContent : 'center'
  }
}