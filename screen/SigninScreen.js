import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Dimensions, ImageBackground, Alert} from 'react-native'
import Userservice from '../user/user.service'
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as actioncreators from '../redux/actioncreators';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state={txtPassword:'',txtUsername:''};
    this.logIn = this.logIn.bind(this)
  }
  static navigationOptions =({navigation})=>({
    title: 'Đăng nhập',
    headerStyle: { backgroundColor: 'black', height:screenHeight*0.07},
    headerTitleStyle: { color: 'white' },
    headerTintColor:'white'
  });
  logIn = async ()=>{
    const { txtPassword , txtUsername } = this.state;
    await this.props.signIn(txtUsername,txtPassword)
    this.setState({txtPassword:'',txtUsername:''})
  }
  componentDidUpdate(){
    if(this.props.users.Id)
    this.props.navigation.navigate('Home');
  }
  renderLogin(){
    const {navigate} = this.props.navigation
    return (
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200} >
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
        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={this.logIn}
                    disabled = {this.state.txtUsername&&this.state.txtPassword?false:true}
                    style={this.state.txtUsername&&this.state.txtPassword?styles.buttonEnable:styles.buttonDisable}>
                    <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                <Text style = {styles.textNormal}>Nếu chưa có tài khoản</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={()=>{navigate('Signup')}}
                    style={styles.buttonEnable}>
                    <Text style={styles.text}>Đăng ký</Text>
                </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    )
  }
  render() {
    return (
      <View style={{flex : 1 }}>
        <ImageBackground 
        source={require('./../pic/background-home.jpg')} 
        style={{width: '100%', height: '100%'}}>
          {this.renderLogin()}
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
const mapStateToprops = state => ({users : state.users})
export default connect(mapStateToprops,actioncreators)(Signin);