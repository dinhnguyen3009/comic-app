import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import Userservice from '../user/user.service'
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Singin extends Component {
  constructor(props){
    super(props);
    this.state={txtPassword:'',txtUsername:''};
  }
  signin = async () => {
    try {
        const {txtUsername , txtPassword} = this.state;
        const response = await Userservice.signIn(txtUsername,txtPassword);
        if(response.data.success===true){
          alert('Dang nhap thanh cong')
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Profile' })],
          });
        this.props.navigation.dispatch(resetAction);
        }
        else{
          alert(response.data.message);
        }

    } catch (error) {
      alert(error.message)
    }
  }
  render() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex : 1  , backgroundColor:'#4267b2'}}>
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200} >
      <View style={{alignItems : 'center' , justifyContent : 'center',marginTop:screenHeight*0.2}}>
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
            </View>
            <View style={{ width : screenWidth*0.9, margin:10}}>
                <TouchableOpacity 
                    onPress={this.signin}
                    disabled = {this.state.txtUsername&&this.state.txtPassword?false:true}
                    style={{backgroundColor : this.state.txtUsername&&this.state.txtPassword?'#3393FD':'#B1E6F0' ,alignItems:'center', padding : 5 , borderRadius : 5, height:35, marginBottom:5}}>
                    <Text style={{ fontSize : 20 , color : 'white', fontWeight:'bold'}}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{alignItems : 'center' , justifyContent : 'center'}}>
                <Text>Nếu chưa có tài khoản</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={()=>{navigate('Signup')}}
                    style={{backgroundColor : '#3393FD' ,alignItems:'center', padding : 5 , borderRadius : 5,height:35, marginTop:5}}>
                    <Text style={{ fontSize : 20 , color : 'white', fontWeight:'bold'}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
      </View>
      </KeyboardAwareScrollView>
      </View>
    )
  }
}
